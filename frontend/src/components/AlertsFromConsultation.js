import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AlertsFromConsultation.css";

const AlertsFromConsultation = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios
      .get("https://solidking1.pythonanywhere.com/api/technician_alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="alerts-from-consultation">
      <h2>🚨 Drug Administration Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts yet</p>
      ) : (
        <ul>
          {alerts.map((a) => (
            <li key={a.id}>
              <strong>{a.patientName}</strong> — NIHSS: {a.nihssScore}
              <br />
              <em>{a.note}</em>
              <br />
              Arrival Time: {a.time}
              <br />
              Administer Drug:{" "}
              {a.administerDrug ? (
                <span className="yes-badge">✔ Yes — {a.drug}</span>
              ) : (
                <span className="no-badge">❌ No</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsFromConsultation;
