import mysql.connector
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class TravelApp:
    def __init__(self):
        self.db_connection = self.connect_to_database()
        
    def connect_to_database(self):
        """Estabelece conexão com o banco de dados MySQL"""
        try:
            conn = mysql.connector.connect(
                host="localhost",
                user="root", # "travel_user",
                password="Alpine@187", # "travel123",
                database="travel_db"
            )
            return conn
        except mysql.connector.Error as err:
            print(f"Erro de conexão: {err}")
            return None
    
    def register_user(self, name, email, password, phone=None):
        """Cadastra um novo usuário"""
        cursor = self.db_connection.cursor()
        query = "INSERT INTO users (name, email, password, phone) VALUES (%s, %s, %s, %s)"
        values = (name, email, password, phone)
        
        try:
            cursor.execute(query, values)
            self.db_connection.commit()
            return {"status": "success", "user_id": cursor.lastrowid}
        except mysql.connector.Error as err:
            return {"status": "error", "message": str(err)}
    
    def search_destinations(self, location=None, start_date=None, end_date=None, max_price=None):
        """Busca destinos disponíveis"""
        cursor = self.db_connection.cursor(dictionary=True)
        
        query = "SELECT * FROM destinations WHERE 1=1"
        params = []
        
        if location:
            query += " AND location LIKE %s"
            params.append(f"%{location}%")
        
        if start_date and end_date:
            query += " AND id IN (SELECT destination_id FROM availability WHERE date BETWEEN %s AND %s AND available = 1)"
            params.extend([start_date, end_date])
        
        if max_price:
            query += " AND price_per_night <= %s"
            params.append(max_price)
        
        try:
            cursor.execute(query, params)
            return cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Erro na busca: {err}")
            return []
    
    def book_accommodation(self, user_id, destination_id, check_in, check_out, guests):
        """Reserva uma hospedagem"""
        cursor = self.db_connection.cursor()
        
        # Verifica disponibilidade
        availability_query = """
        SELECT COUNT(*) as unavailable_days FROM availability 
        WHERE destination_id = %s AND date BETWEEN %s AND %s AND available = 0
        """
        cursor.execute(availability_query, (destination_id, check_in, check_out))
        result = cursor.fetchone()
        
        if result[0] > 0:
            return {"status": "error", "message": "Datas não disponíveis"}
        
        # Calcula preço total
        price_query = "SELECT price_per_night FROM destinations WHERE id = %s"
        cursor.execute(price_query, (destination_id,))
        price_per_night = cursor.fetchone()[0]
        
        days = (datetime.strptime(check_out, "%Y-%m-%d") - datetime.strptime(check_in, "%Y-%m-%d")).days
        total_price = price_per_night * days
        
        # Cria a reserva
        booking_query = """
        INSERT INTO bookings (user_id, destination_id, check_in, check_out, guests, total_price, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        booking_values = (user_id, destination_id, check_in, check_out, guests, total_price, "Confirmado")
        
        try:
            cursor.execute(booking_query, booking_values)
            booking_id = cursor.lastrowid
            
            # Atualiza disponibilidade
            update_avail_query = """
            UPDATE availability SET available = 0 
            WHERE destination_id = %s AND date BETWEEN %s AND %s
            """
            cursor.execute(update_avail_query, (destination_id, check_in, check_out))
            
            self.db_connection.commit()
            return {"status": "success", "booking_id": booking_id, "total_price": total_price}
        except mysql.connector.Error as err:
            self.db_connection.rollback()
            return {"status": "error", "message": str(err)}
    
    def get_user_bookings(self, user_id):
        """Obtém todas as reservas de um usuário"""
        cursor = self.db_connection.cursor(dictionary=True)
        query = """
        SELECT b.*, d.name as destination_name, d.location, d.image_url 
        FROM bookings b
        JOIN destinations d ON b.destination_id = d.id
        WHERE b.user_id = %s
        ORDER BY b.check_in DESC
        """
        
        try:
            cursor.execute(query, (user_id,))
            return cursor.fetchall()
        except mysql.connector.Error as err:
            print(f"Erro ao buscar reservas: {err}")
            return []

# Rotas da API
travel_app = TravelApp()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    result = travel_app.register_user(
        data['name'],
        data['email'],
        data['password'],
        data.get('phone')
    )
    return jsonify(result)

@app.route('/api/search', methods=['GET'])
def search():
    location = request.args.get('location')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    max_price = request.args.get('max_price')
    
    results = travel_app.search_destinations(location, start_date, end_date, max_price)
    return jsonify(results)

@app.route('/api/book', methods=['POST'])
def book():
    data = request.get_json()
    result = travel_app.book_accommodation(
        data['user_id'],
        data['destination_id'],
        data['check_in'],
        data['check_out'],
        data['guests']
    )
    return jsonify(result)

@app.route('/api/bookings/<int:user_id>', methods=['GET'])
def bookings(user_id):
    results = travel_app.get_user_bookings(user_id)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)