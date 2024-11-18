const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    // Get all best markets
    router.get('/', (req, res) => {
        db.query('SELECT * FROM best_markets', (err, results) => {
            if (err) {
                console.error('Error retrieving best markets:', err);
                return res.status(500).json({ success: false, message: 'Error retrieving best markets' });
            }
            res.json(results);
        });
    });

    // Add a new best market
    router.post('/', (req, res) => {
        const { best_market_id, crop_id, market_location, average_price, distance_to_farm, transport_cost } = req.body;
        if (!best_market_id || !crop_id || !market_location || !average_price|| !distance_to_farm || !transport_cost) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        db.query(
            'INSERT INTO best_markets ( best_market_id, crop_id, market_location, average_price, distance_to_farm, transport_cost) VALUES (?, ?, ?, ?)',
            [ best_market_id, crop_id, market_location, average_price, distance_to_farm, transport_cost],
            (err, results) => {
                if (err) {
                    console.error('Error adding best market:', err);
                    return res.status(500).json({ success: false, message: 'Error adding best market' });
                }
                res.status(201).json({ success: true, message: 'Best market added successfully', bestMarketId: results.insertId });
            }
        );
    });

    return router;
};
