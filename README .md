# HomeFolio — Family Finance Management System

> One Family. One Financial Picture.

HomeFolio is a normalized relational database system designed to unify multi-member household finances, bridging isolated bank accounts, recurring bills, categorical budgets, and collaborative savings goals.

---

## 🏗️ Architecture & Features (V1 Core - Relational DBMS)

* **Schema Normalization:** Designed strictly up to 3NF to prevent insert, update, and deletion anomalies.
* **Integrity Constraints:** Multi-column candidate keys, strict `CHECK` constraints, foreign keys with cascading actions.
* **Automated Logic:** MySQL `TRIGGERS` for real-time account balance syncs and goal funding.
* **Analytical Queries:** Advanced queries utilizing CTEs (`WITH` clauses), multi-table joins, subqueries, and window functions (`DENSE_RANK`, `PARTITION BY`).
* **ACID Transaction Management:** Stored procedures utilizing `START TRANSACTION`, `COMMIT`, and `ROLLBACK` for multi-account fund transfers and bill settlements.

---

## 📁 Repository Organization

* `database/schema/`: DDL scripts containing table definitions and relational constraints.
* `database/seeds/`: DML scripts containing mock household dataset.
* `database/triggers/`: Event-driven automation scripts.
* `database/views/`: Reusable virtual tables for family liquidity and budget deviations.
* `database/queries/`: Curated SQL queries grouped by complexity (Joins, CTEs, Window Functions).
* `docs/`: Entity-Relationship Diagrams, Relational Models, and Data Dictionaries.

---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/homefolio.git
   cd homefolio