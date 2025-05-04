// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import "../css/Auth.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://solidking1.pythonanywhere.com/api/signup",
        formData
      );
      setMessage("✅ Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("❌ Error signing up. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="logo-section">
        <h1>Mobile Stroke Unit</h1>
        <p>Create an account to join our network</p>
      </div>

      <h2>📝 Sign Up</h2>
      {message && (
        <p
          className={
            message.startsWith("✅") ? "alert-success" : "alert-danger"
          }
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="tech">Stroke Technician</option>
          <option value="neurologist">Neurologist</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
