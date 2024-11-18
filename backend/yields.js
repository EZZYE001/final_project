const express = require('express');
const router = express.Router();
const db = require('../config.js');  // Assuming db configuration is in config/db.js

// Route to get yields
router.get('/', (req, res) => {
    const query = 'SELECT * FROM yields';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching yields:', err);
            res.status(500).json({ success: false, message: 'Failed to fetch yields.' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
