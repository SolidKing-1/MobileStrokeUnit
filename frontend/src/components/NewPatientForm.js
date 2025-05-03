// src/components/NewPatientForm.js
import React, { useState } from "react";
import axios from "axios";
import "../css/NewPatientForm.css";

const NewPatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    arrivalTime: "",
    systolic: "",
    diastolic: "",
    heartRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    glucose: "",
    temp: "",
    medicalHistory: [],
    currentMeds: "",
    allergies: "",
    strokeHistory: "",
    imagingNotes: "",
    imagingTime: "",
    nihssScore: "",
    ctScan: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const newHistory = prev.medicalHistory.includes(value)
          ? prev.medicalHistory.filter((v) => v !== value)
          : [...prev.medicalHistory, value];
        return { ...prev, medicalHistory: newHistory };
      });
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, ctScan: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      for (let key in formData) {
        if (key === "medicalHistory") {
          payload.append(key, JSON.stringify(formData[key]));
        } else {
          payload.append(key, formData[key]);
        }
      }

      await axios.post("http://localhost:5000/api/patients", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Patient submitted successfully!");
      setFormData({
        name: "",
        age: "",
        sex: "",
        arrivalTime: "",
        systolic: "",
        diastolic: "",
        heartRate: "",
        respiratoryRate: "",
        oxygenSaturation: "",
        glucose: "",
        temp: "",
        medicalHistory: [],
        currentMeds: "",
        allergies: "",
        strokeHistory: "",
        imagingNotes: "",
        imagingTime: "",
        nihssScore: "",
        ctScan: null,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit patient.");
    }
  };

  return (
    <div className="form-page">
      <div className="new-patient-form">
      <h2>🧾 New Patient Form</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <option value="">Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="datetime-local"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          required
        />

        <hr />
        <h4>Vitals</h4>
        <input
          type="text"
          name="systolic"
          placeholder="Systolic BP"
          value={formData.systolic}
          onChange={handleChange}
        />
        <input
          type="text"
          name="diastolic"
          placeholder="Diastolic BP"
          value={formData.diastolic}
          onChange={handleChange}
        />
        <input
          type="number"
          name="heartRate"
          placeholder="Heart Rate"
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
          placeholder="Oxygen Saturation"
          value={formData.oxygenSaturation}
          onChange={handleChange}
        />
        <input
          type="number"
          name="glucose"
          placeholder="Blood Glucose Level"
          value={formData.glucose}
          onChange={handleChange}
        />
        <input
          type="number"
          name="temp"
          placeholder="Temperature"
          value={formData.temp}
          onChange={handleChange}
        />

        <hr />
        <h4>Medical History</h4>
        {[
          "Hypertension",
          "Diabetes",
          "Atrial Fibrillation",
          "Current Medications",
          "Family History of Stroke",
        ].map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              name="medicalHistory"
              value={item}
              onChange={handleChange}
              checked={formData.medicalHistory.includes(item)}
            />
            {item}
          </label>
        ))}
        <input
          type="text"
          name="currentMeds"
          placeholder="Current Medications"
          value={formData.currentMeds}
          onChange={handleChange}
        />
        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          value={formData.allergies}
          onChange={handleChange}
        />
        <input
          type="text"
          name="strokeHistory"
          placeholder="Previous Stroke Events"
          value={formData.strokeHistory}
          onChange={handleChange}
        />

        <hr />
        <h4>Imaging</h4>
        <input type="file" name="ctScan" onChange={handleChange} />
        <input
          type="datetime-local"
          name="imagingTime"
          value={formData.imagingTime}
          onChange={handleChange}
        />
        <textarea
          name="imagingNotes"
          placeholder="Radiologist Notes"
          value={formData.imagingNotes}
          onChange={handleChange}
        />

        <hr />
        <input
          type="number"
          name="nihssScore"
          placeholder="NIHSS Score"
          value={formData.nihssScore}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Patient</button>
      </form>
    </div>

    </div>
    
      );
};

export default NewPatientForm;
