import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import './SubmitGrievance.css';

const SubmitGrievance = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
    priority: 'medium'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    if (!formData.subject || !formData.category || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await api.post('/api/grievances', formData);
      setSuccess('Grievance submitted successfully!');
      setTimeout(() => {
        navigate('/my-grievances');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit grievance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="submit-grievance">
        <h1>Submit New Grievance</h1>
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
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter grievance subject"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="academic">Academic</option>
                <option value="administrative">Administrative</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="hostel">Hostel</option>
                <option value="library">Library</option>
                <option value="examination">Examination</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                className="form-control"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
                rows="8"
                placeholder="Describe your grievance in detail..."
              ></textarea>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Grievance'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitGrievance;

