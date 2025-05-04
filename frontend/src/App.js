// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

import NewPatientForm from "./components/NewPatientForm";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";
import AlertsList from "./components/AlertsList";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import ConfirmPage from "./components/ConfirmPage";
import TechnicianDashboard from "./components/TechnicianDashboard";
import NeurologistDashboard from "./components/NeurologistDashboard";
import AlertsFromConsultation from "./components/AlertsFromConsultation";
import LandingPage from "./components/LandingPage";
import Reports from "./components/Reports";import EditPatientForm from "./components/EditPatientForm";


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
            <Route path="/" element={<LandingPage />} />
            <Route path="/patients/new" element={<NewPatientForm />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/alerts" element={<AlertsList />} />
            <Route path="/tech-alerts" element={<AlertsFromConsultation />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/confirm" element={<ConfirmPage />} />
            <Route path="/dashboard" element={<TechnicianDashboard />} />
            <Route
              path="/neurologist_dashboard"
              element={<NeurologistDashboard />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/patients/edit/:id" element={<EditPatientForm />} />
          </Routes>
        </main>
        <footer>
          <p>
            &copy; {new Date().getFullYear()} Mobile Stroke Unit - All rights
            reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate(); // ✅ get navigate function

  const logout = () => {
    localStorage.clear();
    navigate("/login"); // ✅ no page refresh
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
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/patients/new">New Patient</Link>
            </li>
            <li>
              <Link to="/tech-alerts">Alerts</Link>
            </li>
          </>
        )}
        {role === "neurologist" && (
          <>
            <li>
              <Link to="/neurologist_dashboard">Dashboard</Link>
            </li>
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
