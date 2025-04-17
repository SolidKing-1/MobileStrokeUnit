// src/components/NewPatientForm.js
import React, { useState } from "react";
import axios from "axios";
import "../css/NewPatientForm.css";

const NewPatientForm = () => {
    console.log("NewPatientForm loaded");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    chiefComplaint: "",
    medicalHistory: "",
    bloodPressure: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    labResults: "",
    imaging: "",
    nihssScore: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/patients",
        formData
      ); // Replace with live API when deployed
      setMessage("✅ Patient added successfully!");
      setFormData({
        // reset form
        name: "",
        age: "",
        sex: "",
        chiefComplaint: "",
        medicalHistory: "",
        bloodPressure: "",
        heartRate: "",
        respiratoryRate: "",
        oxygenSaturation: "",
        labResults: "",
        imaging: "",
        nihssScore: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding patient.");
    }
  };

  return (
    <div className="new-patient-form">
      <h2>🧾 New Patient Form</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <textarea
          name="chiefComplaint"
          placeholder="Chief Complaint"
          value={formData.chiefComplaint}
          onChange={handleChange}
          required
        />
        <textarea
          name="medicalHistory"
          placeholder="Medical History"
          value={formData.medicalHistory}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bloodPressure"
          placeholder="Blood Pressure (e.g., 120/80)"
          value={formData.bloodPressure}
          onChange={handleChange}
        />
        <input
          type="number"
          name="heartRate"
          placeholder="Heart Rate (bpm)"
          value={formData.heartRate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="respiratoryRate"
          placeholder="Respiratory Rate"
          value={formData.respiratoryRate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="oxygenSaturation"
          placeholder="Oxygen Saturation (%)"
          value={formData.oxygenSaturation}
          onChange={handleChange}
        />

        <textarea
          name="labResults"
          placeholder="Lab Results (e.g., CBC: normal)"
          value={formData.labResults}
          onChange={handleChange}
        />
        <textarea
          name="imaging"
          placeholder="Imaging Notes (e.g., CT scan result)"
          value={formData.imaging}
          onChange={handleChange}
        />
        <input
          type="number"
          name="nihssScore"
          placeholder="NIHSS Score"
          value={formData.nihssScore}
          onChange={handleChange}
        />

        <button type="submit">Submit Patient</button>
      </form>
    </div>
  );
};

export default NewPatientForm;
