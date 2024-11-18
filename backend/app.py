from flask import Flask, jsonify, request
from flask_cors import CORS  
import mysql.connector

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Database configuration
db_config = {
    'user': 'root',
    'password': 'Slimthug4190@',
    'host': 'localhost',
    'database': 'farm_market_tracker'
}

# Route to fetch all crops
@app.route('/api/crops', methods=['GET'])
def get_crops():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM crops")  # Use the correct table name 'crops'
        crops = cursor.fetchall()
        return jsonify(crops)
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    finally:
        cursor.close()
        connection.close()

# Route to fetch a specific crop by its ID
@app.route('/api/crops/<int:id>', methods=['GET'])
def get_crop(id):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM crops WHERE crop_id = %s", (id,))  # Use the correct column names and table name
        crop = cursor.fetchone()
        if crop:
            return jsonify(crop)
        else:
            return jsonify({"message": "Crop not found"}), 404
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    finally:
        cursor.close()
        connection.close()

# Route to add a new crop
@app.route('/api/crops', methods=['POST'])
def add_crop():
    new_crop = request.get_json()
    print("Received new crop data:", new_crop)  # Debugging line
    
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute("""
            INSERT INTO crops (crop_id, crop_name, crop_type, season, price)
            VALUES (%s, %s, %s, %s, %s)
        """, (new_crop['crop_id'], new_crop['crop_name'], new_crop['crop_type'], new_crop['season'], new_crop['price']))
        connection.commit()
        return jsonify({"message": "Crop added successfully"}), 201
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    finally:
        cursor.close()
        connection.close()

# Route to update a crop's information
@app.route('/api/crops/<int:id>', methods=['PUT'])
def update_crop(id):
    updated_crop = request.get_json()
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute("""
            UPDATE crops SET crop_name = %s, crop_type = %s, season = %s, price = %s
            WHERE crop_id = %s
        """, (updated_crop['crop_name'], updated_crop['crop_type'], updated_crop['season'], updated_crop['price'], id))
        connection.commit()
        return jsonify({"message": "Crop updated successfully"})
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    finally:
        cursor.close()
        connection.close()

# Route to delete a crop by its ID
@app.route('/api/crops/<int:id>', methods=['DELETE'])
def delete_crop(id):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        cursor.execute("DELETE FROM crops WHERE crop_id = %s", (id,))
        connection.commit()
        return jsonify({"message": "Crop deleted successfully"})
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"error": "Database operation failed"}), 500
    finally:
        cursor.close()
        connection.close()

# Route for the homepage
@app.route('/')
def index():
    return "Welcome to the Farm Market Tracker"

if __name__ == '__main__':
    app.run(debug=True, port=4000)
