import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to GIT Grievance Redressal System</h1>
            <p className="hero-subtitle">
              A platform for Students, Staff, Faculty, and Stakeholders to submit and track grievances
            </p>
            {!user ? (
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">Register Now</Link>
                <Link to="/login" className="btn btn-secondary">Sign In</Link>
              </div>
            ) : (
              <div className="hero-buttons">
                <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
                <Link to="/submit-grievance" className="btn btn-secondary">Submit Grievance</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="info-section">
          <h2 className="section-title">General Information</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3><i className="fas fa-graduation-cap"></i> Admission 2025-26</h3>
              <div className="info-details">
                <p><strong>Engineering:</strong> 9561931427 / 9922940076 / 9923265075 / 9145363639 / 9552700888</p>
                <p><strong>MCA:</strong> 9822321906</p>
                <p><strong>MMS:</strong> 8669195742 / 9422152788</p>
              </div>
            </div>
            <div className="info-card">
              <h3><i className="fas fa-building"></i> Department Contacts</h3>
              <div className="info-details">
                <p><strong>Registrar:</strong> 9763305297</p>
                <p><strong>Academics:</strong> 9420376273</p>
                <p><strong>Accounts:</strong> 7798312364</p>
                <p><strong>Exam:</strong> 8087211980</p>
                <p><strong>IT Helpdesk:</strong> Contact IT Department</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

