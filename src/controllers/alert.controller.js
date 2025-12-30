const db = require('../config/db');

/**
 * GET /api/companies/:companyId/alerts/low-stock
 * logic: 
 * 1. Filter by company warehouses.
 * 2. Check current stock < threshold.
 * 3. Verify sales activity in last 30 days.
 */
exports.getLowStockAlerts = async (req, res) => {
  const { companyId } = req.params;

  try {
    const [alerts] = await db.query(`
      SELECT
        p.id AS product_id,
        p.name AS product_name,
        p.sku,
        w.id AS warehouse_id,
        w.name AS warehouse_name,
        i.quantity AS current_stock,
        i.low_stock_threshold AS threshold,
        s.id AS supplier_id,
        s.name AS supplier_name,
        s.contact_email,
        (
          SELECT SUM(sa.quantity) / 30 
          FROM sales sa 
          WHERE sa.product_id = p.id 
          AND sa.created_at >= NOW() - INTERVAL 30 DAY
        ) as daily_velocity
      FROM inventory i
      JOIN products p ON p.id = i.product_id
      JOIN warehouses w ON w.id = i.warehouse_id
      LEFT JOIN product_suppliers ps ON ps.product_id = p.id
      LEFT JOIN suppliers s ON s.id = ps.supplier_id
      WHERE w.company_id = ?
        AND i.quantity <= i.low_stock_threshold
        AND EXISTS (
          SELECT 1 FROM sales sa 
          WHERE sa.product_id = p.id 
          AND sa.created_at >= NOW() - INTERVAL 30 DAY
        )
    `, [companyId]);

    const formattedAlerts = alerts.map(row => {
      const velocity = row.daily_velocity || 0;
      // Calculate days until stockout; handle 0 velocity to avoid Infinity
      const daysUntilStockout = velocity > 0 ? Math.floor(row.current_stock / velocity) : 'N/A';

      return {
        product_id: row.product_id,
        product_name: row.product_name,
        sku: row.sku,
        warehouse_id: row.warehouse_id,
        warehouse_name: row.warehouse_name,
        current_stock: row.current_stock,
        threshold: row.threshold,
        days_until_stockout: daysUntilStockout,
        supplier: {
          id: row.supplier_id,
          name: row.supplier_name,
          contact_email: row.contact_email
        }
      };
    });

    res.status(200).json({
      alerts: formattedAlerts,
      total_alerts: formattedAlerts.length
    });

  } catch (error) {
    console.error("Alerts Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};