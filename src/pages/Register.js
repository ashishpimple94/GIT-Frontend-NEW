import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    userType: '',
    department: '',
    contactNumber: ''
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setErrors([]);
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});

    if (!formData.username || !formData.email || !formData.password || !formData.fullName || !formData.userType) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...registerData } = formData;
    
    try {
      const result = await register(registerData);
      setLoading(false);

      if (result.success) {
        navigate('/dashboard');
      } else {
        // Handle field-specific errors
        if (result.field) {
          if (result.field === 'both') {
            // If both username and email exist, show error on both fields
            setFieldErrors({ 
              username: 'This username is already taken.',
              email: 'This email is already registered.'
            });
            setError('Both username and email are already registered. Please use different credentials or try logging in.');
          } else {
            setFieldErrors({ [result.field]: result.message });
            setError('');
          }
          setErrors([]);
        }
        // Priority: Show errors array first, then message
        else if (result.errors && Array.isArray(result.errors) && result.errors.length > 0) {
          setErrors(result.errors);
          setError('');
          setFieldErrors({});
        } else if (result.message) {
          setError(result.message);
          setErrors([]);
          setFieldErrors({});
        } else {
          setError('Registration failed. Please try again.');
          setErrors([]);
          setFieldErrors({});
        }
      }
    } catch (err) {
      setLoading(false);
      setError('An unexpected error occurred. Please try again.');
      setErrors([]);
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register User</h2>
        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}
        {errors && Array.isArray(errors) && errors.length > 0 && (
          <div className="alert alert-error">
            <ul>
              {errors.map((err, idx) => (
                <li key={idx}>{err.msg || err.message || err}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">
              <i className="fas fa-user"></i> Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-at"></i> Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-control ${fieldErrors.username ? 'error-border' : ''}`}
              value={formData.username}
              onChange={handleChange}
              required
            />
            {fieldErrors.username && (
              <small className="field-error">{fieldErrors.username}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${fieldErrors.email ? 'error-border' : ''}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {fieldErrors.email && (
              <small className="field-error">{fieldErrors.email}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="userType">
              <i className="fas fa-users"></i> User Type *
            </label>
            <select
              id="userType"
              name="userType"
              className="form-control"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="">Select User Type</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="faculty">Faculty</option>
              <option value="stakeholder">Stakeholder</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">
              <i className="fas fa-building"></i> Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">
              <i className="fas fa-phone"></i> Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              className="form-control"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <i className="fas fa-lock"></i> Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;

