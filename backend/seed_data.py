from models import db, Patient, Consultation
from app import app
import json
from datetime import datetime, timedelta

with app.app_context():
    db.drop_all()
    db.create_all()

    base_time = datetime.now()

    patients = [
        {
            "name": "Alyssa Jimenez",
            "age": 78,
            "sex": "Female",
            "arrivalTime": "2024-04-05T10:15:00",
            "systolic": "185",
            "diastolic": "110",
            "heartRate": 104,
            "respiratoryRate": 22,
            "oxygenSaturation": 91,
            "glucose": 175,
            "temp": 37.4,
            "medicalHistory": "Hypertension, Diabetes",
            "currentMeds": "Lisinopril, Metformin",
            "allergies": "Penicillin",
            "strokeHistory": "Minor stroke in 2022",
            "labResults": "CBC: Normal",
            "imagingNotes": "CT shows left MCA infarct",
            "imagingTime": "2024-04-05T10:30:00",
            "ctScanFilename": "ct_scan_1.jpg",
            "nihssScore": 17
        },
        {
            "name": "Carlos Reyes",
            "age": 60,
            "sex": "Male",
            "arrivalTime": base_time.isoformat(),
            "systolic": "160",
            "diastolic": "100",
            "heartRate": 85,
            "respiratoryRate": 22,
            "oxygenSaturation": 96,
            "glucose": 130,
            "temp": 37.2,
            "medicalHistory": "Hypertension",
            "currentMeds": "Amlodipine",
            "allergies": "None",
            "strokeHistory": "None",
            "labResults": "Cholesterol: High",
            "imagingNotes": "Mild infarct signs",
            "imagingTime": (base_time + timedelta(minutes=15)).isoformat(),
            "ctScanFilename": "ct_scan_6.jpg",
            "nihssScore": 9
        },
        {
            "name": "Diana Murphy",
            "age": 72,
            "sex": "Female",
            "arrivalTime": (base_time + timedelta(hours=1)).isoformat(),
            "systolic": "190",
            "diastolic": "105",
            "heartRate": 110,
            "respiratoryRate": 24,
            "oxygenSaturation": 89,
            "glucose": 190,
            "temp": 38.0,
            "medicalHistory": "Diabetes, Heart Disease",
            "currentMeds": "Metoprolol",
            "allergies": "Sulfa",
            "strokeHistory": "Stroke in 2020",
            "labResults": "CBC: Elevated WBC",
            "imagingNotes": "Infarct in right hemisphere",
            "imagingTime": (base_time + timedelta(hours=1, minutes=20)).isoformat(),
            "ctScanFilename": "ct_scan_7.jpg",
            "nihssScore": 20
        },
        {
            "name": "Ethan Parker",
            "age": 68,
            "sex": "Male",
            "arrivalTime": (base_time + timedelta(hours=2)).isoformat(),
            "systolic": "175",
            "diastolic": "95",
            "heartRate": 88,
            "respiratoryRate": 20,
            "oxygenSaturation": 97,
            "glucose": 150,
            "temp": 36.8,
            "medicalHistory": "None",
            "currentMeds": "None",
            "allergies": "None",
            "strokeHistory": "None",
            "labResults": "Normal",
            "imagingNotes": "Normal CT, MRI recommended",
            "imagingTime": (base_time + timedelta(hours=2, minutes=15)).isoformat(),
            "ctScanFilename": "ct_scan_8.jpg",
            "nihssScore": 6
        },
        {
            "name": "Fiona Gallagher",
            "age": 75,
            "sex": "Female",
            "arrivalTime": (base_time + timedelta(hours=3)).isoformat(),
            "systolic": "182",
            "diastolic": "99",
            "heartRate": 102,
            "respiratoryRate": 25,
            "oxygenSaturation": 92,
            "glucose": 140,
            "temp": 37.6,
            "medicalHistory": "Hypertension, Asthma",
            "currentMeds": "Lisinopril, Salbutamol",
            "allergies": "Latex",
            "strokeHistory": "TIA 2019",
            "labResults": "Electrolytes: Normal",
            "imagingNotes": "Signs of ischemia",
            "imagingTime": (base_time + timedelta(hours=3, minutes=30)).isoformat(),
            "ctScanFilename": "ct_scan_9.jpg",
            "nihssScore": 14
        },
        {
            "name": "George Hill",
            "age": 80,
            "sex": "Male",
            "arrivalTime": (base_time + timedelta(hours=4)).isoformat(),
            "systolic": "200",
            "diastolic": "110",
            "heartRate": 115,
            "respiratoryRate": 26,
            "oxygenSaturation": 88,
            "glucose": 160,
            "temp": 38.3,
            "medicalHistory": "Stroke, Heart Failure",
            "currentMeds": "Warfarin",
            "allergies": "Shellfish",
            "strokeHistory": "Stroke in 2018 and 2021",
            "labResults": "PT/INR elevated",
            "imagingNotes": "Extensive cerebral damage",
            "imagingTime": (base_time + timedelta(hours=4, minutes=15)).isoformat(),
            "ctScanFilename": "ct_scan_10.jpg",
            "nihssScore": 23
        },
        {
            "name": "Helen Knight",
            "age": 66,
            "sex": "Female",
            "arrivalTime": "2024-04-05T11:10:00",
            "systolic": "165",
            "diastolic": "95",
            "heartRate": 98,
            "respiratoryRate": 21,
            "oxygenSaturation": 94,
            "glucose": 140,
            "temp": 37.0,
            "medicalHistory": "Hypertension",
            "currentMeds": "Losartan",
            "allergies": "None",
            "strokeHistory": "None",
            "labResults": "ECG: Normal",
            "imagingNotes": "Possible ischemia in frontal lobe",
            "imagingTime": "2024-04-05T11:30:00",
            "ctScanFilename": "ct_scan_2.jpg",
            "nihssScore": 11
        },
        {
            "name": "Isaac Newton",
            "age": 70,
            "sex": "Male",
            "arrivalTime": "2024-04-05T12:00:00",
            "systolic": "158",
            "diastolic": "98",
            "heartRate": 92,
            "respiratoryRate": 20,
            "oxygenSaturation": 93,
            "glucose": 155,
            "temp": 37.8,
            "medicalHistory": "Diabetes",
            "currentMeds": "Insulin",
            "allergies": "Nuts",
            "strokeHistory": "Minor stroke 2021",
            "labResults": "A1C: Elevated",
            "imagingNotes": "Old infarct evident",
            "imagingTime": "2024-04-05T12:30:00",
            "ctScanFilename": "ct_scan_3.jpg",
            "nihssScore": 12
        },
        {
            "name": "Julia Roberts",
            "age": 74,
            "sex": "Female",
            "arrivalTime": "2024-04-05T13:45:00",
            "systolic": "170",
            "diastolic": "102",
            "heartRate": 108,
            "respiratoryRate": 23,
            "oxygenSaturation": 90,
            "glucose": 180,
            "temp": 37.5,
            "medicalHistory": "High cholesterol",
            "currentMeds": "Atorvastatin",
            "allergies": "Dust",
            "strokeHistory": "TIA in 2023",
            "labResults": "LDL: High",
            "imagingNotes": "Possible blockage in carotid artery",
            "imagingTime": "2024-04-05T14:00:00",
            "ctScanFilename": "ct_scan_4.jpg",
            "nihssScore": 16
        }
    ]

    for p in patients:
        patient = Patient(
            name=p["name"],
            age=p["age"],
            sex=p["sex"],
            arrivalTime=p["arrivalTime"],
            systolic=p["systolic"],
            diastolic=p["diastolic"],
            heartRate=p["heartRate"],
            respiratoryRate=p["respiratoryRate"],
            oxygenSaturation=p["oxygenSaturation"],
            glucose=p["glucose"],
            temp=p["temp"],
            medicalHistory=json.dumps(p["medicalHistory"]),
            currentMeds=p["currentMeds"],
            allergies=p["allergies"],
            strokeHistory=p["strokeHistory"],
            labResults=p["labResults"],
            imagingNotes=p["imagingNotes"],
            imagingTime=p["imagingTime"],
            ctScanFilename=p["ctScanFilename"],
            nihssScore=p["nihssScore"]
        )
        db.session.add(patient)

    db.session.commit()

    consultations = [
        {"patient_id": 1, "note": "Patient Alyssa Jimenez presents with NIHSS 17. Recommend tPA."},
        {"patient_id": 2, "note": "Carlos Reyes likely TIA. Monitor only."},
        {"patient_id": 3, "note": "High-risk case. Diana Murphy should be admitted for observation."},
        {"patient_id": 5, "note": "Fiona Gallagher has TIA history. Start aspirin."},
        {"patient_id": 10, "note": "Julia Roberts may benefit from surgery. Refer to vascular team."},
    ]

    for c in consultations:
        consult = Consultation(
            patient_id=c["patient_id"],
            note=c["note"]
        )
        db.session.add(consult)

    db.session.commit()
    print("✅ Database seeded successfully with 10 patients and 5 consultations.")
