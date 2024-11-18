const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const config = require('./config.js'); 
const cropsRoutes = require('./routes/crops');  
const bestMarketsRoute = require('./routes/best_markets');
const marketPricesRoute = require('./routes/market_prices');
const yieldsRoute = require('./routes/yields');

// Create an Express app
const app = express();
const port = 4000;
const db = mysql.createConnection(config);

app.use(cors()); // Enable all CORS requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));



//define routes
app.use('/api/crops', cropsRoutes);
app.use('/api/best_markets', bestMarketsRoute);
app.use('/api/market_prices', marketPricesRoute);
app.use('/api/yields', yieldsRoute);

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Use the crops routes
app.use('/api/crops', cropsRoutes(db));  // Pass db to routes

// Example API route to test database connection
app.get('/test', (req, res) => {
    db.query('SELECT * FROM crops', (err, results) => {
        if (err) {
            console.error('Error executing query: ', err);
            res.status(500).send('Error retrieving data');
        } else {
            res.json(results);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));  // Serve index.html from 'frontend'
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
