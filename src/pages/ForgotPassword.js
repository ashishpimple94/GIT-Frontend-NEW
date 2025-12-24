import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/axios';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('/api/auth/forgot-password', { email });
      if (res.status === 200 || res.status === 201) {
        setSuccess(res.data.message || 'Password reset link has been sent to your email');
        setEmail('');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code,
        request: error.request
      });
      
      // Handle different types of errors
      let errorMessage = 'Failed to send reset link. Please try again.';
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        errorMessage = 'Cannot connect to server. Please make sure the server is running.';
      } else if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Server error: ${error.response.status}`;
        
        // If it's a server error about email configuration, show helpful message
        if (error.response.status === 500 && errorMessage.includes('Email service')) {
          errorMessage = 'Email service is not configured. Please contact the administrator.';
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle"></i> {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
              autoFocus
            />
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '15px' }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Remember your password? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

