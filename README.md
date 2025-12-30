# Inventory Management System (StockFlow)

## Overview
This project is a backend system design and API implementation for a **B2B Inventory Management System**.
It is built as part of a case study to demonstrate backend engineering skills, system design thinking,
and the ability to work with incomplete requirements.

The system allows businesses to manage products across multiple warehouses, track inventory levels,
and receive low-stock alerts with supplier information.

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MySQL (SQL)**
- **dotenv**
- **Git & GitHub**

---

## Features Implemented
- Product creation with SKU uniqueness validation
- Inventory management across multiple warehouses
- Database transaction handling for data consistency
- Inventory change tracking (design-level)
- Low-stock alert API with:
  - Multi-warehouse support
  - Recent sales filtering
  - Supplier details for reordering
- Clean and scalable project structure
- Proper use of `.gitignore` to protect sensitive files

---

## Project Structure
inventory-management-system/
├── docs/
│ ├── part1-debugging.md
│ ├── part2-database-design.md
│ └── part3-api-design.md
│
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── config/
│ └── utils/
│
├── README.md
├── package.json
├── package-lock.json
└── .gitignore

### Low Stock Alerts
**GET** `/api/companies/{company_id}/alerts/low-stock`

Returns low-stock alerts across all warehouses for a company,
including supplier details such as supplier name and contact email.

---

## Assumptions Made
Due to intentionally incomplete requirements, the following assumptions were made:
- SKU is unique across the platform
- Products can exist in multiple warehouses
- Default low-stock threshold is 20 units
- Recent sales are defined as sales in the last 30 days
- Each product has one primary supplier

These assumptions are documented and can be modified as business needs evolve.
