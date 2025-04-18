from flask import Blueprint, request, jsonify
from models.patient import Patient, db
from models.consultation import Consultation

patient_bp = Blueprint("patients", __name__)

@patient_bp.route("/api/patients", methods=["GET"])
def get_patients():
    patients = Patient.query.all()
    result = [{
        "id": p.id,
        "name": p.name,
        "age": p.age,
        "sex": p.sex,
        "chiefComplaint": p.chiefComplaint
    } for p in patients]
    return jsonify(result)

@patient_bp.route("/api/patients/<int:patient_id>", methods=["GET"])
def get_patient(patient_id):
    p = Patient.query.get_or_404(patient_id)
    return jsonify({
        "id": p.id,
        "name": p.name,
        "age": p.age,
        "sex": p.sex,
        "chiefComplaint": p.chiefComplaint,
        "medicalHistory": p.medicalHistory,
        "bloodPressure": p.bloodPressure,
        "heartRate": p.heartRate,
        "respiratoryRate": p.respiratoryRate,
        "oxygenSaturation": p.oxygenSaturation,
        "labResults": p.labResults,
        "imaging": p.imaging,
        "nihssScore": p.nihssScore
    })

@patient_bp.route("/api/patients/<int:patient_id>/consultations", methods=["GET"])
def get_consultations(patient_id):
    consults = Consultation.query.filter_by(patient_id=patient_id).all()
    return jsonify([{"id": c.id, "note": c.note} for c in consults])

@patient_bp.route("/api/patients/<int:patient_id>/consultations", methods=["POST"])
def add_consultation(patient_id):
    data = request.get_json()
    note = data.get("note")
    new_c = Consultation(note=note, patient_id=patient_id)
    db.session.add(new_c)
    db.session.commit()
    return jsonify({"message": "Consultation added"}), 201

@patient_bp.route("/api/alerts", methods=["GET"])
def get_alerts():
    critical_patients = Patient.query.filter(
        (Patient.bloodPressure >= "160/100") | 
        (Patient.oxygenSaturation < 95)
    ).all()
    
    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "age": p.age,
            "bloodPressure": p.bloodPressure,
            "oxygenSaturation": p.oxygenSaturation
        } for p in critical_patients
    ])
