# config.py

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Slimthug4190@',
    'database': 'farm_market_tracker'
}

import mysql.connector
from flask import Flask

# Function to connect to the database
def connect_to_database():
    connection = mysql.connector.connect(**db_config)
    print("Connected to the database")
    return connection

# Flask app configuration
app = Flask(__name__)

# Route for the homepage
@app.route('/')
def index():
    return "Welcome to the Farm Market Tracker"

# Run the application only if this script is executed directly
if __name__ == "__main__":
    # Test database connection
    connect_to_database()  # Call this if you want to check the connection separately

    # Start the Flask server
    app.run(debug=True, port=4000)


    
