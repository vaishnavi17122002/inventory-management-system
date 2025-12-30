# Part 3: Low Stock Alerts API Design & Implementation

## Overview
This part implements an API that returns low-stock alerts for a company.
The goal is to proactively notify businesses when products are running low,
so they can reorder from suppliers in time.

This API considers real-world business rules such as:
- Multiple warehouses per company
- Product-specific stock thresholds
- Recent sales activity
- Supplier information for reordering

---

## Endpoint Specification

GET /api/companies/{company_id}/alerts/low-stock

---

## Business Rules
1. A company can have multiple warehouses
2. Products can be stored in multiple warehouses
3. A low-stock alert is generated only if:
   - Current stock is below the defined threshold
   - The product has recent sales activity
4. Supplier details must be included for easy reordering

---

## Assumptions
Due to incomplete requirements, the following assumptions were made:
- Default low-stock threshold is 20 units
- Recent sales are defined as sales within the last 30 days
- Each product has one primary supplier
- Average daily sales are approximated for stockout calculation

These assumptions are documented and can be adjusted based on business feedback.

---

## High-Level Logic Flow
1. Receive company_id from request parameters
2. Fetch all warehouses belonging to the company
3. Retrieve inventory data for those warehouses
4. Filter products where:
   - inventory.quantity < threshold
   - product has sales in last 30 days
5. Attach supplier information
6. Calculate estimated days until stockout
7. Return formatted alert response

---

## Sample Response

```json
{
  "alerts": [
    {
      "product_id": 123,
      "product_name": "Widget A",
      "sku": "WID-001",
      "warehouse_id": 456,
      "warehouse_name": "Main Warehouse",
      "current_stock": 5,
      "threshold": 20,
      "days_until_stockout": 12,
      "supplier": {
        "id": 789,
        "name": "Supplier Corp",
        "contact_email": "orders@supplier.com"
      }
    }
  ],
  "total_alerts": 1
}
