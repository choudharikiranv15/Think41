// routes/departments.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// List all departments, with product count
router.get('/departments', (req, res) => {
    db.all('SELECT * FROM departments', (err, rows) => {
      if (err) {
        console.error('Error fetching departments:', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ departments: rows });
    });
  });
  
  

// Get department details by id
router.get('/departments/:id', (req, res) => {
  db.get(
    `SELECT id, name FROM departments WHERE id = ?`,
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Department not found' });
      res.json({ department: row });
    }
  );
});

// Get products for a department (with pagination)
router.get('/departments/:id/products', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 12;
  const page = parseInt(req.query.page, 10) || 1;
  const offset = (page - 1) * limit;
  const deptId = req.params.id;

  db.get(
    'SELECT COUNT(*) AS count FROM products WHERE department_id = ?',
    [deptId],
    (err, countRow) => {
      if (err) return res.status(500).json({ error: err.message });

      db.all(
        `SELECT p.*, d.name AS department_name
         FROM products p
         LEFT JOIN departments d ON p.department_id = d.id
         WHERE p.department_id = ?
         LIMIT ? OFFSET ?`,
        [deptId, limit, offset],
        (err2, products) => {
          if (err2) return res.status(500).json({ error: err2.message });

          res.json({
            products,
            pagination: {
              total: countRow.count,
              page,
              limit,
              totalPages: Math.ceil(countRow.count / limit)
            }
          });
        }
      );
    }
  );
});

module.exports = router;
