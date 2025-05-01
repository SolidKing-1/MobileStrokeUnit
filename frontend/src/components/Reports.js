// src/components/Reports.js
import React from "react";
import "../css/Reports.css";

const Reports = () => {
  return (
    <div className="reports-page">
      <div className="sidebar">
        <a href="/neurologist_dashboard">Dashboard</a>
        <a href="/patients">Patients</a>
        <a href="/reports" className="active">
          Reports
        </a>
      </div>
      <div className="main">
        <h2>📊 Reports</h2>

        <div className="reports-overview">
          <div className="chart-box">
            <h3>OVERVIEW</h3>
            <div className="chart-placeholder">[Chart Placeholder]</div>
          </div>
          <div className="stats-box">
            <h3>STATISTICS</h3>
            <p>• Total Patients: 10</p>
            <p>• Avg NIHSS Score: 12.3</p>
            <p>• Critical Alerts: 4</p>
          </div>
        </div>

        <table className="trends-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Vital</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jane Doe</td>
              <td>BP</td>
              <td>-10 mmHg</td>
            </tr>
            <tr>
              <td>John Smith</td>
              <td>HR</td>
              <td>+5 bpm</td>
            </tr>
            <tr>
              <td>Emily White</td>
              <td>O2 Sat</td>
              <td>+3%</td>
            </tr>
          </tbody>
        </table>

        <div className="export-area">
          <textarea placeholder="Add notes or summary..."></textarea>
          <button>Export</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
