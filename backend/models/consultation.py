from . import db

class Consultation(db.Model):
    __tablename__ = 'consultations'

    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.Text, nullable=False)
    administerDrug = db.Column(db.Boolean, default=False)
    drug = db.Column(db.String(100))  # ✅ ADD THIS LINE
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

