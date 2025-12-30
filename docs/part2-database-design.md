# Part 2: Database Design

## Overview
The database is designed to support:
- Multiple companies
- Multiple warehouses per company
- Products stored in multiple warehouses
- Inventory change tracking
- Supplier relationships
- Sales activity tracking

---

## Database Schema (SQL)

```sql
CREATE TABLE companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

CREATE TABLE warehouses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_id INT,
  name VARCHAR(255),
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10,2)
);

CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  warehouse_id INT,
  quantity INT,
  UNIQUE (product_id, warehouse_id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
);

CREATE TABLE inventory_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inventory_id INT,
  change_qty INT,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  contact_email VARCHAR(255)
);

CREATE TABLE product_suppliers (
  product_id INT,
  supplier_id INT,
  PRIMARY KEY (product_id, supplier_id)
);

CREATE TABLE sales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
