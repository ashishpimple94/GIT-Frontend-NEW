import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../config/axios';
import './Auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid reset token');
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await api.post('/api/auth/reset-password', {
        token,
        password: formData.password
      });
      setSuccess('Password has been reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
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
            <label htmlFor="password">
              <i className="fas fa-lock"></i> New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="4"
              placeholder="Enter new password"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <i className="fas fa-lock"></i> Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="4"
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading || !token}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Remember your password? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

