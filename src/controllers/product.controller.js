const db = require('../config/db');

exports.createProduct = async (req, res) => {
  const {
    name,
    sku,
    price,
    warehouse_id,
    initial_quantity = 0
  } = req.body;

  // 1. Input validation
  if (!name || !sku || !price || !warehouse_id) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const connection = await db.getConnection();

  try {
    // 2. Start transaction
    await connection.beginTransaction();

    // 3. Check SKU uniqueness
    const [existing] = await connection.query(
      "SELECT id FROM products WHERE sku = ?",
      [sku]
    );

    if (existing.length > 0) {
      throw new Error("SKU already exists");
    }

    // 4. Create product
    const [productResult] = await connection.query(
      "INSERT INTO products (name, sku, price) VALUES (?, ?, ?)",
      [name, sku, price]
    );

    const productId = productResult.insertId;

    // 5. Create inventory entry
    await connection.query(
      "INSERT INTO inventory (product_id, warehouse_id, quantity) VALUES (?, ?, ?)",
      [productId, warehouse_id, initial_quantity]
    );

    // 6. Commit transaction
    await connection.commit();

    res.status(201).json({
      message: "Product created successfully",
      product_id: productId
    });

  } catch (error) {
    // 7. Rollback on failure
    await connection.rollback();
    res.status(500).json({
      error: error.message
    });
  } finally {
    connection.release();
  }
};
