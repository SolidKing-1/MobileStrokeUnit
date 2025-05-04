// src/components/EditPatientForm.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/NewPatientForm.css";

const EditPatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/patients/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error loading patient data", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/patients/${id}`, formData);
      setMessage("✅ Patient updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("Error updating patient", err);
      setMessage("❌ Update failed.");
    }
  };

  return (
    <div className="new-patient-form">
      <h2>✏️ Edit Patient</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
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
          value={formData.chiefComplaint}
          onChange={handleChange}
        />
        <textarea
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
        />
        <input
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
        />
        <input
          type="number"
          name="heartRate"
          value={formData.heartRate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="respiratoryRate"
          value={formData.respiratoryRate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="oxygenSaturation"
          value={formData.oxygenSaturation}
          onChange={handleChange}
        />
        <textarea
          name="labResults"
          value={formData.labResults}
          onChange={handleChange}
        />
        <textarea
          name="imaging"
          value={formData.imaging}
          onChange={handleChange}
        />
        <input
          type="number"
          name="nihssScore"
          value={formData.nihssScore}
          onChange={handleChange}
        />
        <button type="submit">Update Patient</button>
      </form>
    </div>
  );
};

export default EditPatientForm;
