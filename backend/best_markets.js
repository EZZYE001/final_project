const express = require('express');
const router = express.Router();
const db = require('../config.js');  // Assuming db configuration is in config/db.js

// Route to get best markets
router.get('/', (req, res) => {
    const query = 'SELECT * FROM best_markets';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching best markets:', err);
            res.status(500).json({ success: false, message: 'Failed to fetch markets.' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
