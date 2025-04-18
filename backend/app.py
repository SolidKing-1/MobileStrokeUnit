# backend/app.py
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db, bcrypt
from routes.auth import auth_bp
from models.patient import Patient
from models.consultation import Consultation
from routes.patient import patient_bp



app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
JWTManager(app)
db.init_app(app)
bcrypt.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(patient_bp)

# Create DB tables
@app.before_request
def create_tables():
    with app.app_context():
        db.create_all()
        if Patient.query.count() == 0:
            fake = Patient(
                name="John Doe",
                age=65,
                sex="Male",
                chiefComplaint="Left side weakness",
                medicalHistory="Diabetes, Hypertension",
                bloodPressure="180/100",
                heartRate=110,
                respiratoryRate=22,
                oxygenSaturation=92,
                labResults="CBC: normal, Glucose: high",
                imaging="CT scan shows ischemic stroke",
                nihssScore=14
            )
            db.session.add(fake)
            db.session.commit()


@app.route("/")
def home():
    return {"message": "Backend is live!"}

if __name__ == "__main__":
    app.run(debug=True)
