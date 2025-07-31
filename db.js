const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./think41.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        // Create departments table (normalized table)
        db.run(
            `CREATE TABLE IF NOT EXISTS departments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL
            )`
        );

        // Create products table (with both department name and department_id for migration)
        db.run(
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                cost REAL,
                category TEXT,
                name TEXT,
                brand TEXT,
                retail_price REAL,
                department TEXT,  -- will be deprecated after migration
                sku TEXT,
                distribution_center_id INTEGER,
                department_id INTEGER,  -- new foreign key
                FOREIGN KEY (department_id) REFERENCES departments(id)
            )`
        );
    }
});

module.exports = db;
