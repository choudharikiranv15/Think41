const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Show absolute path for debugging/hard bugs
const dbPath = path.resolve('./think41.db');
console.log('Loading DB from:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database at:', dbPath);

    // Use serialize to guarantee order
    db.serialize(() => {
      // Create departments table
      db.run(`
        CREATE TABLE IF NOT EXISTS departments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL
        )
      `, (deptErr) => {
        if (deptErr) {
          console.error('Error creating departments table:', deptErr.message);
        } else {
          console.log('Ensured departments table exists.');
        }
      });

      // Create products table
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY,
          cost REAL,
          category TEXT,
          name TEXT,
          brand TEXT,
          retail_price REAL,
          department TEXT,
          sku TEXT,
          distribution_center_id INTEGER,
          department_id INTEGER,
          FOREIGN KEY (department_id) REFERENCES departments(id)
        )
      `, (prodErr) => {
        if (prodErr) {
          console.error('Error creating products table:', prodErr.message);
        } else {
          console.log('Ensured products table exists.');
        }
      });
    });
  }
});

module.exports = db;
