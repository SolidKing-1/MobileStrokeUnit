# models/patient.py
from . import db
from .consultation import Consultation

class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    sex = db.Column(db.String(10))
    arrivalTime = db.Column(db.String(50))

    systolic = db.Column(db.String(10))
    diastolic = db.Column(db.String(10))
    heartRate = db.Column(db.Integer)
    respiratoryRate = db.Column(db.Integer)
    oxygenSaturation = db.Column(db.Integer)
    glucose = db.Column(db.Integer)
    temp = db.Column(db.Float)
    chiefComplaint = db.Column(db.String(255), nullable=True)  # adjust as needed

    medicalHistory = db.Column(db.Text)  # Stored as JSON string
    currentMeds = db.Column(db.String(200))
    allergies = db.Column(db.String(200))
    strokeHistory = db.Column(db.String(200))
    labResults = db.Column(db.String(255))
    imaging = db.Column(db.String(255))

    imagingNotes = db.Column(db.Text)
    imagingTime = db.Column(db.String(50))
    ctScanFilename = db.Column(db.String(100))  # store the filename

    nihssScore = db.Column(db.Integer)

    consultations = db.relationship("Consultation", backref="patient", cascade="all, delete-orphan")
