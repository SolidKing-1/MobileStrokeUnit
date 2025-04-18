# backend/app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models.user import db, bcrypt
from routes.auth import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
JWTManager(app)
db.init_app(app)
bcrypt.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp)

# Create DB tables
@app.before_request
def create_tables():
    db.create_all()

@app.route("/")
def home():
    return {"message": "Backend is live!"}

if __name__ == "__main__":
    app.run(debug=True)
