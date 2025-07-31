// routes/products.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /api/products?limit=20&page=1
router.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * limit;

    db.get('SELECT COUNT(*) AS count FROM products', (countErr, countRow) => {
        if (countErr) return res.status(500).json({ error: countErr.message });

        // JOIN with departments, return department_name
        db.all(`
            SELECT 
                p.id, p.cost, p.category, p.name, p.brand, p.retail_price, 
                p.sku, p.distribution_center_id, p.department_id, 
                d.name AS department_name
            FROM products p
            LEFT JOIN departments d ON p.department_id = d.id
            LIMIT ? OFFSET ?
        `, [limit, offset], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
                products: rows,
                pagination: {
                    total: countRow.count,
                    page,
                    limit,
                    totalPages: Math.ceil(countRow.count / limit)
                }
            });
        });
    });
});

// GET /api/products/:id
router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'Invalid product ID format' });
    }
    db.get(`
        SELECT 
            p.id, p.cost, p.category, p.name, p.brand, p.retail_price, 
            p.sku, p.distribution_center_id, p.department_id,
            d.name AS department_name
        FROM products p
        LEFT JOIN departments d ON p.department_id = d.id
        WHERE p.id = ?
    `, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Product not found' });
        res.json({ product: row });
    });
});

module.exports = router;
