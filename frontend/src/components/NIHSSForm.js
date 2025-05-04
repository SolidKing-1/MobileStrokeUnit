// src/components/NIHSSForm.js
import React, { useState } from "react";
import "../css/NIHSSForm.css";

const NIHSSForm = ({ onScoreChange }) => {
  const [form, setForm] = useState({
    loc: "0",
    gaze: "0",
    visual: "0",
    facial: "0",
    arm: "0",
    leg: "0",
    ataxia: "0",
    sensory: "0",
    language: "0",
    dysarthria: "0",
    inattention: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    // Calculate total score
    const total = Object.values(updated).reduce(
      (sum, v) => sum + parseInt(v),
      0
    );
    onScoreChange(total); // Pass score up to parent
  };

  return (
    <div className="nihss-form">
      <h3>🧠 NIHSS Score</h3>
      {Object.keys(form).map((key) => (
        <div key={key}>
          <label>{key.toUpperCase()}: </label>
          <select name={key} value={form[key]} onChange={handleChange}>
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default NIHSSForm;
