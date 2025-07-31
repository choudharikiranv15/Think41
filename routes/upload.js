// routes/upload.js
const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const db = require('../db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('file'), (req, res) => {
    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const insert = db.prepare(
                `INSERT OR REPLACE INTO products 
                (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
            );
            results.forEach((row) => {
                insert.run(
                    row.id,
                    row.cost,
                    row.category,
                    row.name,
                    row.brand,
                    row.retail_price,
                    row.department,
                    row.sku,
                    row.distribution_center_id
                );
            });
            insert.finalize(() => {
                fs.unlinkSync(filePath); // Cleanup
                res.json({ success: true, inserted: results.length });
            });
        });
});

module.exports = router;
