// src/components/PatientDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/PatientDetails.css";

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/patients/${id}`);
        setPatient(res.data);
      } catch (err) {
        console.error("Error fetching patient", err);
      }
    };

    const fetchConsults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/patients/${id}/consultations`
        );
        setConsultations(res.data);
      } catch (err) {
        console.error("Error fetching consultations", err);
      }
    };

    fetchPatient();
    fetchConsults();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/patients/${id}/consultations`,
        {
          note: note,
        }
      );
      setMessage("✅ Consultation submitted!");
      setNote("");
      // Re-fetch consultations after new one is added
      const res = await axios.get(
        `http://localhost:5000/api/patients/${id}/consultations`
      );
      setConsultations(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error submitting consultation.");
    }
  };

  if (!patient) return <p>Loading patient details...</p>;

  return (
    <div className="patient-detail">
      <h2>🧑‍⚕️ Patient Detail: {patient.name}</h2>
      <div className="patient-info">
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Sex:</strong> {patient.sex}
        </p>
        <p>
          <strong>Chief Complaint:</strong> {patient.chiefComplaint}
        </p>
        <p>
          <strong>Medical History:</strong> {patient.medicalHistory}
        </p>
        <p>
          <strong>Blood Pressure:</strong> {patient.bloodPressure}
        </p>
        <p>
          <strong>Heart Rate:</strong> {patient.heartRate}
        </p>
        <p>
          <strong>Respiratory Rate:</strong> {patient.respiratoryRate}
        </p>
        <p>
          <strong>Oxygen Saturation:</strong> {patient.oxygenSaturation}
        </p>
        <p>
          <strong>Lab Results:</strong> {patient.labResults}
        </p>
        <p>
          <strong>Imaging:</strong> {patient.imaging}
        </p>
        <p>
          <strong>NIHSS Score:</strong> {patient.nihssScore}
        </p>
      </div>

      <hr />

      <div className="consult-section">
        <h3>📝 Submit Consultation</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your consultation notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Consultation</button>
        </form>

        <h3>📄 Past Consultations</h3>
        <ul>
          {consultations.map((c, i) => (
            <li key={i}>{c.note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetail;
