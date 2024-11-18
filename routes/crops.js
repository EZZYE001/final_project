const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    // Get all crops
    router.get('/', (req, res) => {
        db.query('SELECT * FROM crops', (err, results) => {
            if (err) {
                console.error('Error retrieving crops:', err);
                return res.status(500).json({ success: false, message: 'Error retrieving crops' });
            }
            res.json(results);
        });
    });

    // Add a new crop
    router.post('/', (req, res) => {
        const { crop_name, crop_type, season, crop_id, price } = req.body;
        if (!crop_name || !crop_type || !season || !crop_id || !price) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        db.query(
            'INSERT INTO crops (crop_name, crop_type, season, crop_id, price) VALUES (?, ?, ?, ?, ?)',
            [crop_name, crop_type, season, crop_id, price],
            (err, results) => {
                if (err) {
                    console.error('Error adding crop:', err);
                    return res.status(500).json({ success: false, message: 'Error adding crop' });
                }
                res.status(201).json({ success: true, message: 'Crop added successfully', cropId: results.insertId });
            }
        );
    });

    return router;
};
