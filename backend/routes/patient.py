from flask import Blueprint, request, jsonify
from models.patient import Patient, db
from models.consultation import Consultation
import os, json
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required

patient_bp = Blueprint("patients", __name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend', 'static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------------- GET ALL PATIENTS ----------------------
@patient_bp.route("/api/patients", methods=["GET"])
def get_patients():
    def determine_severity(p):
        try:
            if p.nihssScore >= 15 or p.oxygenSaturation < 92:
                return "severe"
            elif p.nihssScore >= 8 or p.oxygenSaturation < 96:
                return "moderate"
            else:
                return "mild"
        except:
            return "unknown"

    patients = Patient.query.all()
    result = [{
        "id": p.id,
        "name": p.name,
        "age": p.age,
        "sex": p.sex,
        "chiefComplaint": p.chiefComplaint,
        "nihssScore": p.nihssScore,
        "oxygenSaturation": p.oxygenSaturation,
        "severity": determine_severity(p)
    } for p in patients]
    return jsonify(result)


@patient_bp.route("/api/consultations", methods=["GET"])
def all_consultations():
    consultations = Consultation.query.all()
    return jsonify([
        {
            "id": c.id,
            "note": c.note,
            "patient_id": c.patient_id
        } for c in consultations
    ])

@patient_bp.route("/api/reports", methods=["GET"])
def report_summary():
    total = Patient.query.count()
    high_nihss = Patient.query.filter(Patient.nihssScore >= 15).count()
    avg_score = db.session.query(db.func.avg(Patient.nihssScore)).scalar()

    return jsonify({
        "total_patients": total,
        "critical_cases": high_nihss,
        "avg_nihss": round(avg_score or 0, 1)
    })


# ---------------------- GET PATIENT BY ID ----------------------
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
        "bloodPressure": f"{p.systolic}/{p.diastolic}",  # Combine systolic/diastolic
        "heartRate": p.heartRate,
        "respiratoryRate": p.respiratoryRate,
        "oxygenSaturation": p.oxygenSaturation,
        "labResults": p.labResults or "N/A",  # Default fallback
        "imaging": p.imagingNotes or "No imaging notes yet",  # Map to imagingNotes
        "nihssScore": p.nihssScore
    })

# ---------------------- GET CONSULTATIONS FOR PATIENT ----------------------
@patient_bp.route("/api/patients/<int:patient_id>/consultations", methods=["GET"])
def get_consultations(patient_id):
    consults = Consultation.query.filter_by(patient_id=patient_id).all()
    return jsonify([{"id": c.id, "note": c.note} for c in consults])

# ---------------------- ADD CONSULTATION ----------------------
@patient_bp.route("/api/patients/<int:patient_id>/consultations", methods=["POST"])
def add_consultation(patient_id):
    data = request.get_json()
    note = data.get("note")
    administerDrug = data.get("administerDrug", False)
    drug = data.get("drug") if administerDrug else None  # Only store drug if drug admin is true

    new_c = Consultation(
        note=note,
        administerDrug=administerDrug,
        drug=drug,  # ✅ Save drug
        patient_id=patient_id
    )
    db.session.add(new_c)
    db.session.commit()
    return jsonify({"message": "Consultation added"}), 201


# ---------------------- TECHNICIAN ALERTS FROM CONSULTATION ----------------------
@patient_bp.route("/api/technician_alerts", methods=["GET"])
def technician_alerts():
    alerts = Consultation.query.filter_by(administerDrug=True).all()
    result = []
    for a in alerts:
        patient = Patient.query.get(a.patient_id)
        result.append({
            "id": a.id,
            "patientName": patient.name,
            "nihssScore": patient.nihssScore,
            "note": a.note,
            "time": patient.arrivalTime,
            "administerDrug": a.administerDrug,   # ✅ <-- This was missing!
            "drug": a.drug or "tPA"
        })
    return jsonify(result)


@patient_bp.route("/api/neurologist/summary", methods=["GET"])
def neurologist_summary():
    total_patients = Patient.query.count()
    appointments = 4  # Replace with actual data later if needed
    alerts = Consultation.query.filter_by(administerDrug=True).count()

    return jsonify({
        "newPatients": total_patients,
        "appointments": appointments,
        "alerts": alerts
    })

# routes/patient.py (Add this to your patient_bp routes)

@patient_bp.route("/api/patients/<int:patient_id>", methods=["PUT"])
def update_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    data = request.get_json()

    patient.name = data.get("name", patient.name)
    patient.age = int(data.get("age", patient.age))
    patient.sex = data.get("sex", patient.sex)
    patient.chiefComplaint = data.get("chiefComplaint", patient.chiefComplaint)
    patient.medicalHistory = json.dumps(data.get("medicalHistory", patient.medicalHistory))
    patient.systolic = data.get("systolic", patient.systolic)
    patient.diastolic = data.get("diastolic", patient.diastolic)
    patient.heartRate = int(data.get("heartRate", patient.heartRate))
    patient.respiratoryRate = int(data.get("respiratoryRate", patient.respiratoryRate))
    patient.oxygenSaturation = int(data.get("oxygenSaturation", patient.oxygenSaturation))
    patient.labResults = data.get("labResults", patient.labResults)
    patient.imagingNotes = data.get("imaging", patient.imagingNotes)
    patient.nihssScore = int(data.get("nihssScore", patient.nihssScore))

    db.session.commit()
    return jsonify({"message": "✅ Patient updated successfully"}), 200

# ---------------------- GET CRITICAL PATIENT ALERTS ----------------------
@patient_bp.route("/api/alerts", methods=["GET"])
def get_alerts():
    critical_patients = Patient.query.filter(
        (Patient.nihssScore >= 15) | (Patient.oxygenSaturation < 92)
    ).all()
    
    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "age": p.age,
            "bloodPressure": f"{p.systolic}/{p.diastolic}",
            "oxygenSaturation": p.oxygenSaturation,
            "nihssScore": p.nihssScore
        } for p in critical_patients
    ])


# ---------------------- NEW: POST /api/patients ----------------------
@patient_bp.route('/api/patients', methods=['POST'])
def create_patient():
    data = request.form

    # Save CT scan file if provided
    file = request.files.get('ctScan')
    filename = None
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(UPLOAD_FOLDER, filename))

    new_patient = Patient(
        name=data.get('name'),
        age=int(data.get('age')),
        sex=data.get('sex'),
        arrivalTime=data.get('arrivalTime'),
        systolic=data.get('systolic'),
        diastolic=data.get('diastolic'),
        heartRate=int(data.get('heartRate') or 0),
        respiratoryRate=int(data.get('respiratoryRate') or 0),
        oxygenSaturation=int(data.get('oxygenSaturation') or 0),
        glucose=int(data.get('glucose') or 0),
        temp=float(data.get('temp') or 0),
        medicalHistory=json.dumps(data.get('medicalHistory') or "[]"),
        currentMeds=data.get('currentMeds'),
        allergies=data.get('allergies'),
        strokeHistory=data.get('strokeHistory'),
        imagingNotes=data.get('imagingNotes'),
        imagingTime=data.get('imagingTime'),
        ctScanFilename=filename,
        nihssScore=int(data.get('nihssScore') or 0)
    )

    db.session.add(new_patient)
    db.session.commit()
    return jsonify({"message": "✅ Patient added successfully"}), 201
