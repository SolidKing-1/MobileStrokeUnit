// src/components/TechnicianDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/TechnicianDashboard.css";

const TechnicianDashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("https://solidking1.pythonanywhere.com/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="technician-dashboard">
      <h2>🧾 Technician Dashboard</h2>
      {patients.length === 0 ? (
        <p>No patients yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Severity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>
                  <span className={`status-tag status-${p.severity}`}>
                    {p.severity?.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/patients/${p.id}`} className="view">
                      View
                    </Link>
                    <Link to={`/patients/edit/${p.id}`} className="edit">
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TechnicianDashboard;
