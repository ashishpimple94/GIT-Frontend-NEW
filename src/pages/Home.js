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
            <h1 className="hero-title">
              GIT Grievance Redressal System
            </h1>
            <p className="hero-subtitle">
              A comprehensive digital platform empowering Students, Staff, Faculty, and Stakeholders to submit, track, and resolve grievances efficiently with transparency and accountability
            </p>
            {!user ? (
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary btn-large btn-hero">
                  <i className="fas fa-user-plus"></i> 
                  <span>Register Now</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
                <Link to="/login" className="btn btn-secondary btn-large btn-hero">
                  <i className="fas fa-sign-in-alt"></i> 
                  <span>Sign In</span>
                </Link>
              </div>
            ) : (
              <div className="hero-buttons">
                <Link to="/dashboard" className="btn btn-primary btn-large btn-hero">
                  <i className="fas fa-tachometer-alt"></i> 
                  <span>Go to Dashboard</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
                <Link to="/submit-grievance" className="btn btn-secondary btn-large btn-hero">
                  <i className="fas fa-plus-circle"></i> 
                  <span>Submit Grievance</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="how-it-works-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon"><i className="fas fa-cogs"></i></span>
              <span>How It Works</span>
            </h2>
            <p className="section-subtitle">Simple steps to get your grievance resolved</p>
          </div>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Register & Login</h3>
                <p>Create your account or sign in to access the grievance portal</p>
              </div>
            </div>
            <div className="step-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            <div className="step-item">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Submit Grievance</h3>
                <p>Fill out the grievance form with all necessary details and attachments</p>
              </div>
            </div>
            <div className="step-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            <div className="step-item">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Track Progress</h3>
                <p>Monitor your grievance status and receive updates in real-time</p>
              </div>
            </div>
            <div className="step-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
            <div className="step-item">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Get Resolved</h3>
                <p>Receive resolution updates and feedback from administrators</p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-icon"><i className="fas fa-info-circle"></i></span>
              <span>General Information</span>
            </h2>
            <p className="section-subtitle">Important contacts and information</p>
          </div>
          <div className="info-cards-container">
            <div className="info-cards">
              <div className="info-card">
              <div className="info-card-header">
                <div className="info-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Admission 2025-26</h3>
              </div>
              <div className="info-details">
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>Engineering:</strong>
                    <span>9561931427 / 9922940076 / 9923265075 / 9145363639 / 9552700888</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>MCA:</strong>
                    <span>9822321906</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>MMS:</strong>
                    <span>8669195742 / 9422152788</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-icon">
                  <i className="fas fa-building"></i>
                </div>
                <h3>Department Contacts</h3>
              </div>
              <div className="info-details">
                <div className="info-item">
                  <i className="fas fa-user-tie"></i>
                  <div>
                    <strong>Registrar:</strong>
                    <span>9763305297</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-book"></i>
                  <div>
                    <strong>Academics:</strong>
                    <span>9420376273</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-calculator"></i>
                  <div>
                    <strong>Accounts:</strong>
                    <span>7798312364</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-clipboard-check"></i>
                  <div>
                    <strong>Exam:</strong>
                    <span>8087211980</span>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-laptop-code"></i>
                  <div>
                    <strong>IT Helpdesk:</strong>
                    <span>Contact IT Department</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who trust our platform for grievance management</p>
            {!user ? (
              <Link to="/register" className="btn btn-primary btn-large btn-cta">
                <i className="fas fa-rocket"></i> Get Started Now
              </Link>
            ) : (
              <Link to="/submit-grievance" className="btn btn-primary btn-large btn-cta">
                <i className="fas fa-plus-circle"></i> Submit Your First Grievance
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

