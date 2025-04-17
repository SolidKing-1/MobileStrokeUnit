// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import NewPatientForm from "./components/NewPatientForm";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";
import AlertsList from "./components/AlertsList";
import Signup from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Keeps role synced with localStorage (optional)
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole !== role) {
      setRole(storedRole);
    }
  }, [role]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar role={role} setRole={setRole} />
        </header>
        <main>
          <Routes>
            <Route path="/patients/new" element={<NewPatientForm />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/alerts" element={<AlertsList />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Navbar({ role, setRole }) {
  const logout = () => {
    localStorage.clear();
    setRole(null);
    window.location.href = "/login";
  };

  return (
    <nav>
      <ul>
        {!role && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {role === "tech" && (
          <>
            <li>
              <Link to="/patients/new">New Patient</Link>
            </li>
            <li>
              <Link to="/alerts">Alerts</Link>
            </li>
          </>
        )}
        {role === "neurologist" && (
          <>
            <li>
              <Link to="/patients">Patient List</Link>
            </li>
            <li>
              <Link to="/alerts">Alerts</Link>
            </li>
          </>
        )}
        {role && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default App;
