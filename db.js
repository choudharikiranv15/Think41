// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./think41.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                cost REAL,
                category TEXT,
                name TEXT,
                brand TEXT,
                retail_price REAL,
                department TEXT,
                sku TEXT,
                distribution_center_id INTEGER
            )`
        );
    }
});

module.exports = db;
