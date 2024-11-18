const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    // Get all market prices
    router.get('/', (req, res) => {
        db.query('SELECT * FROM market_prices', (err, results) => {
            if (err) {
                console.error('Error retrieving market prices:', err);
                return res.status(500).json({ success: false, message: 'Error retrieving market prices' });
            }
            res.json(results);
        });
    });

    // Add a new market price
    router.post('/', (req, res) => {
        const { price_id, crop_id, market_location, price_per_unit, date } = req.body;
        if (!price_id || !crop_id || !market_location || !price_per_unit|| !date) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        db.query(
            'INSERT INTO market_prices (price_id, crop_id, market_location, price_per_unit, date) VALUES (?, ?, ?, ?)',
            [price_id, crop_id, market_location, price_per_unit, date],
            (err, results) => {
                if (err) {
                    console.error('Error adding market price:', err);
                    return res.status(500).json({ success: false, message: 'Error adding market price' });
                }
                res.status(201).json({ success: true, message: 'Market price added successfully', marketPriceId: results.insertId });
            }
        );
    });

    return router;
};
