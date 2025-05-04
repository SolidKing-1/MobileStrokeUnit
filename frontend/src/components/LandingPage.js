// src/components/LandingPage.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";

const LandingPage = () => {
  // Auto-scroll testimonials
  useEffect(() => {
    const testimonialContainer = document.querySelector(
      ".testimonial-container"
    );
    let scrollInterval = setInterval(() => {
      if (
        testimonialContainer.scrollLeft + testimonialContainer.clientWidth >=
        testimonialContainer.scrollWidth
      ) {
        testimonialContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        testimonialContainer.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Mobile Stroke Unit</h1>
          <p>Rapid response. Expert care. Anywhere.</p>
          <div className="buttons">
            <Link to="/login" className="btn primary">
              Log In
            </Link>
            <Link to="/signup" className="btn secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Our Platform Stands Out</h2>
        <div className="feature-grid">
          <div className="card feature-card">
            <h3>🩺 For Neurologists</h3>
            <p>
              Access patient data, review cases, and provide expert consultation
              remotely.
            </p>
          </div>
          <div className="card feature-card">
            <h3>🧑‍⚕️ For Technicians</h3>
            <p>
              Input real-time patient data and send alerts directly to
              specialists.
            </p>
          </div>
          <div className="card feature-card">
            <h3>🚨 Critical Alerts</h3>
            <p>
              Stay updated with live notifications about patients needing urgent
              care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>Our Impact</h2>
        <div className="stat-grid">
          <div className="stat-card">
            <span className="number">1,200+</span>
            <span className="label">Patients Treated</span>
          </div>
          <div className="stat-card">
            <span className="number">98%</span>
            <span className="label">Critical Alert Response Rate</span>
          </div>
          <div className="stat-card">
            <span className="number">15 min</span>
            <span className="label">Average Decision Time</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <p>
              "This platform has revolutionized how we handle stroke emergencies
              in mobile units."
            </p>
            <p>
              <strong>- Dr. Jane Smith, Neurologist</strong>
            </p>
          </div>
          <div className="testimonial-card">
            <p>
              "The alert system is fast and intuitive — a game-changer for our
              team."
            </p>
            <p>
              <strong>- Mark Williams, EMS Technician</strong>
            </p>
          </div>
          <div className="testimonial-card">
            <p>
              "We've reduced critical delays significantly since using this
              tool."
            </p>
            <p>
              <strong>- Sarah Chen, Hospital Coordinator</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
