import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CustomSelect from '../components/CustomSelect';
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
    contactNumber: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setErrors({});
  };

  const handleSelectChange = (name) => (e) => {
    setFormData({
      ...formData,
      [name]: e.target.value
    });
    setError('');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});

    if (!formData.username || !formData.email || !formData.password || !formData.fullName || !formData.userType || !formData.gender) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');
    setErrors({});

    try {
      const { confirmPassword, ...registerData } = formData;
      console.log('[REGISTER] Submitting registration with data:', { ...registerData, password: '***' });
      
      const result = await register(registerData);
      console.log('[REGISTER] Registration result:', result);
      
      if (result.success) {
        console.log('[SUCCESS] Registration successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.error('[ERROR] Registration failed:', result);
        if (result.errors && Array.isArray(result.errors)) {
          setErrors(result.errors);
        } else {
          setError(result.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('[ERROR] Registration exception:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i> Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <CustomSelect
            label="Gender"
            icon="fas fa-venus-mars"
            placeholder="Select Gender"
            value={formData.gender}
            onChange={handleSelectChange('gender')}
            required={true}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
              { value: 'prefer-not-to-say', label: 'Prefer not to say' }
            ]}
          />
          <CustomSelect
            label="User Type"
            icon="fas fa-users"
            placeholder="Select User Type"
            value={formData.userType}
            onChange={handleSelectChange('userType')}
            required={true}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'staff', label: 'Staff' },
              { value: 'faculty', label: 'Faculty' },
              { value: 'stakeholder', label: 'Stakeholder' }
            ]}
          />
          <CustomSelect
            label="Department"
            icon="fas fa-building"
            placeholder="Select Department"
            value={formData.department}
            onChange={handleSelectChange('department')}
            required={false}
            options={[
              { value: 'First Year Engineering', label: 'First Year Engineering' },
              { value: 'Chemical Engineering', label: 'Chemical Engineering' },
              { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
              { value: 'Computer Engineering', label: 'Computer Engineering' },
              { value: 'E&TC Engineering', label: 'E&TC Engineering' },
              { value: 'Civil Engineering', label: 'Civil Engineering' },
              { value: 'CSE AIML Engineering', label: 'CSE AIML Engineering' },
              { value: 'Others', label: 'Others' }
            ]}
          />
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

