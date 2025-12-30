# Part 1: Code Review & Debugging

## Overview
The given API endpoint is responsible for creating a product and initializing its inventory.
Although the code compiles and works in basic scenarios, it has several technical and business
logic issues that can cause failures in production environments.

---

## Identified Issues, Impact & Fixes

### 1. Missing Input Validation
**Issue:**  
The API directly accesses request fields without checking if they exist.

**Impact in Production:**  
- API crashes if required fields are missing
- Invalid data stored in database
- Poor user experience

**Fix:**  
Validate request body and return proper error messages for missing or invalid fields.

---

### 2. SKU Uniqueness Not Enforced
**Issue:**  
SKU must be unique across the platform, but no check exists.

**Impact in Production:**  
- Duplicate products with same SKU
- Reporting, billing, and inventory tracking become unreliable

**Fix:**  
- Add UNIQUE constraint at database level
- Check SKU existence before inserting a new product

---

### 3. No Database Transaction Handling
**Issue:**  
Product and inventory are saved using two separate commits.

**Impact in Production:**  
- Product may be created but inventory fails
- Leads to inconsistent data

**Fix:**  
Wrap both operations inside a database transaction and rollback on failure.

---

### 4. Incorrect Handling of Multiple Warehouses
**Issue:**  
Product creation assumes a single warehouse.

**Impact in Production:**  
- Same product duplicated for different warehouses
- Inventory becomes hard to manage

**Fix:**  
Separate product data from inventory and link inventory with warehouse.

---

### 5. Price Data Type Issue
**Issue:**  
Price stored without ensuring decimal precision.

**Impact in Production:**  
- Rounding errors
- Incorrect invoice calculations

**Fix:**  
Use DECIMAL data type in database.

---

## Conclusion
The corrected implementation focuses on:
- Data integrity
- Scalability
- Real-world business rules
- Production safety
