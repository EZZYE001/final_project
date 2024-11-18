const express = require('express');
const router = express.Router();
const db = require('../config.js');  // Assuming db configuration is in config/db.js

// Route to get market prices
router.get('/', (req, res) => {
    const query = 'SELECT * FROM market_prices';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching market prices:', err);
            res.status(500).json({ success: false, message: 'Failed to fetch market prices.' });
        } else {
            res.json(results);
        }
    });
});

// Route to add market price
router.post('/', (req, res) => {
    const { crop_id, market_id, price, date } = req.body;
    const query = 'INSERT INTO market_prices (crop_id, market_id, price, date) VALUES (?, ?, ?, ?)';
    
    db.query(query, [crop_id, market_id, price, date], (err, result) => {
        if (err) {
            console.error('Error inserting market price:', err);
            res.status(500).json({ success: false, message: 'Failed to insert market price.' });
        } else {
            res.json({ success: true, message: 'Market price added successfully.' });
        }
    });
});

module.exports = router;
