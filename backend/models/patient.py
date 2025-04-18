# models/patient.py
from . import db  # Changed import


class Patient(db.Model):
    __tablename__ = 'patients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    sex = db.Column(db.String(10))
    chiefComplaint = db.Column(db.Text)
    medicalHistory = db.Column(db.Text)
    bloodPressure = db.Column(db.String(20))
    heartRate = db.Column(db.Integer)
    respiratoryRate = db.Column(db.Integer)
    oxygenSaturation = db.Column(db.Integer)
    labResults = db.Column(db.Text)
    imaging = db.Column(db.Text)
    nihssScore = db.Column(db.Integer)

    consultations = db.relationship("Consultation", backref="patient", cascade="all, delete-orphan")

from .consultation import Consultation