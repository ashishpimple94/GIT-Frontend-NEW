import React from 'react';
import './GeneralInfo.css';

const GeneralInfo = () => {
  return (
    <div className="container">
      <div className="general-info">
        <h1>General Information</h1>

        <div className="info-section">
          <div className="info-card">
            <h2><i className="fas fa-graduation-cap"></i> Admission 2025-26</h2>
            <div className="info-content">
              <div className="info-item">
                <strong>Engineering:</strong>
                <p>9561931427 / 9922940076 / 9923265075 / 9145363639 / 9552700888</p>
              </div>
              <div className="info-item">
                <strong>MCA:</strong>
                <p>9822321906</p>
              </div>
              <div className="info-item">
                <strong>MMS:</strong>
                <p>8669195742 / 9422152788</p>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h2><i className="fas fa-building"></i> Department Contacts</h2>
            <div className="info-content">
              <div className="info-item">
                <strong>Registrar:</strong>
                <p>9763305297</p>
              </div>
              <div className="info-item">
                <strong>Academics:</strong>
                <p>9420376273</p>
              </div>
              <div className="info-item">
                <strong>Accounts:</strong>
                <p>7798312364</p>
              </div>
              <div className="info-item">
                <strong>Exam:</strong>
                <p>8087211980</p>
              </div>
              <div className="info-item">
                <strong>IT Helpdesk:</strong>
                <p>Contact IT Department</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;

