// src/components/ConfirmPage.js
import React from "react";
import "../css/ConfirmPage.css";

const ConfirmPage = () => {
  return (
    <div className="confirm-page">
      <div className="modal">
        <div className="icon">✅</div>
        <h2>Patient Saved</h2>
        <p>Your patient data has been successfully submitted!</p>
        <a href="/patients/new">
          <button>Enter Another Patient</button>
        </a>
      </div>
    </div>
  );
};

export default ConfirmPage;
