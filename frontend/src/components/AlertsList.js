// src/components/AlertsList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/AlertsList.css";

const AlertsList = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get(
          "https://solidking1.pythonanywhere.com/api/alerts"
        );
        setAlerts(res.data); // Array of patients with alerts
      } catch (err) {
        console.error("Error fetching alerts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <p>Loading critical alerts...</p>;

  return (
    <div className="alerts-container">
      <h2>🚨 Critical Patient Alerts</h2>
      {alerts.length === 0 ? (
        <p>No critical alerts at the moment.</p>
      ) : (
        <div className="alerts-grid">
          {alerts.map((patient) => (
            <div key={patient.id} className="alert-card">
              <h3>{patient.name}</h3>
              <p>
                <strong>Age:</strong> {patient.age}
              </p>
              <p>
                <strong>BP:</strong> {patient.bloodPressure}
              </p>
              <p>
                <strong>Oxygen:</strong> {patient.oxygenSaturation}%
              </p>
              <Link to={`/patients/${patient.id}`} className="view-btn">
                View Patient
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsList;
