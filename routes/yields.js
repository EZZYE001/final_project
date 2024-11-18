const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    // Get all yields
    router.get('/', (req, res) => {
        db.query('SELECT * FROM yields', (err, results) => {
            if (err) {
                console.error('Error retrieving yields:', err);
                return res.status(500).json({ success: false, message: 'Error retrieving yields' });
            }
            res.json(results);
        });
    });

    // Add a new yield
    router.post('/', (req, res) => {
        const { yield_id, crop_id, harvest_count, yield_quantity, year } = req.body;
        if (!yield_id || !crop_id || !harvest_count || !yield_quantity || !year) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        db.query(
            'INSERT INTO yields (yield_id, crop_id, harvest_count, yield_quantity, year) VALUES (?, ?, ?, ?)',
            [yield_id, crop_id, harvest_count, yield_quantity, year],
            (err, results) => {
                if (err) {
                    console.error('Error adding yield:', err);
                    return res.status(500).json({ success: false, message: 'Error adding yield' });
                }
                res.status(201).json({ success: true, message: 'Yield added successfully', yieldId: results.insertId });
            }
        );
    });

    return router;
};
