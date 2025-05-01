# backend/app.py
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import json
import os
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
with app.app_context():
    db.create_all()
    if Patient.query.count() == 0:
        fake = Patient(
        name="John Doe",
        age=65,
        sex="Male",
        chiefComplaint="Left side weakness",
        medicalHistory=json.dumps(["Diabetes", "Hypertension"]),
        systolic="180",
        diastolic="100",
        heartRate=110,
        respiratoryRate=22,
        oxygenSaturation=92,
        glucose=140,
        temp=37.5,
        labResults="CBC: normal, Glucose: high",
        imagingNotes="CT scan shows ischemic stroke",
        imagingTime="2024-04-01T10:00",
        ctScanFilename=None,
        currentMeds="Metformin",
        allergies="Penicillin",
        strokeHistory="Mild TIA - 2021",
        nihssScore=14
    )
        db.session.add(fake)
        db.session.commit()

@app.route('/uploads/<filename>')
def serve_ct_scan(filename):
    return send_from_directory(os.path.join('static', 'uploads'), filename)


@app.route("/")
def home():
    return {"message": "Backend is live!"}

if __name__ == "__main__":
    app.run(debug=True)
