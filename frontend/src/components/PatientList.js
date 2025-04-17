import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/PatientList.css";
import { Link } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patients");
        setPatients(res.data); // Assume backend returns array of patients
      } catch (err) {
        console.error("Error fetching patients", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <p>Loading patients...</p>;
  }

  return (
    <div className="patient-list-container">
      <h2>👨‍⚕️ Patient List</h2>
      {patients.length === 0 ? (
        <p>No patients yet.</p>
      ) : (
        <div className="patient-card-grid">
          {patients.map((patient) => (
            <div key={patient.id} className="patient-card">
              <h3>{patient.name}</h3>
              <p>
                <strong>Age:</strong> {patient.age}
              </p>
              <p>
                <strong>Sex:</strong> {patient.sex}
              </p>
              <p>
                <strong>Complaint:</strong> {patient.chiefComplaint}
              </p>
              <Link to={`/patients/${patient.id}`} className="detail-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
