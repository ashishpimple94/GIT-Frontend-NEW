import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/general-info">General Info</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Information</h3>
            <p><strong>Admission 2025-26</strong></p>
            <p>Engg: 9561931427 / 9922940076 / 9923265075</p>
            <p>MCA: 9822321906</p>
            <p>MMS: 8669195742 / 9422152788</p>
          </div>
          <div className="footer-section">
            <h3>Departments</h3>
            <p>Registrar: 9763305297</p>
            <p>Academics: 9420376273</p>
            <p>Accounts: 7798312364</p>
            <p>Exam: 8087211980</p>
            <p>IT Helpdesk: Contact IT Department</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Gharda Institute Of Technology. All rights reserved.</p>
          <p>Designed by Amol Salunkhe, GIT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

