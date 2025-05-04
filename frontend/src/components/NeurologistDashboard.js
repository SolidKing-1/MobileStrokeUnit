// src/components/NeurologistDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/NeurologistDashboard.css";

const NeurologistDashboard = () => {
  const [summary, setSummary] = useState({
    newPatients: 0,
    appointments: 0,
    alerts: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/neurologist/summary")
      .then((res) => setSummary(res.data))
      .catch((err) => console.error("Summary fetch error:", err));
  }, []);

  return (
    <div className="neuro-dashboard">
      <div className="sidebar">
        <a href="/neurologist_dashboard" className="active">
          Dashboard
        </a>
        <a href="/patients">Patients</a>
        <a href="/reports">Reports</a>
      </div>

      <div className="main">
        <h1>NEUROLOGIST DASHBOARD</h1>
        <div className="card-group">
          <div className="card">
            <h3>🧾 New Patients</h3>
            <p>{summary.newPatients}</p>
          </div>
          <div className="card">
            <h3>📅 Appointments</h3>
            <p>{summary.appointments}</p>
          </div>
          <div className="card">
            <h3>🚨 Alerts</h3>
            <p>{summary.alerts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default NeurologistDashboard;
