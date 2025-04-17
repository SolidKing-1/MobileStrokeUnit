// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import "../css/Auth.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

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
      const res = await axios.post("http://localhost:5000/api/login", formData);
      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      setRole(role); // 👈 updates App and Navbar immediately

      setMessage("✅ Login successful!");

      setTimeout(() => {
        if (role === "tech") {
          navigate("/patients/new");
        } else {
          navigate("/patients");
        }
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>🔐 Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
