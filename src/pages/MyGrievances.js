import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/axios';
import './MyGrievances.css';

const MyGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const res = await api.get('/api/grievances');
      setGrievances(res.data);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGrievances = filter === 'all' 
    ? grievances 
    : grievances.filter(g => g.status === filter);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="my-grievances-header">
        <h1>My Grievances</h1>
        <Link to="/submit-grievance" className="btn btn-primary">
          <i className="fas fa-plus"></i> Submit New Grievance
        </Link>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({grievances.length})
        </button>
        <button
          className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({grievances.filter(g => g.status === 'pending').length})
        </button>
        <button
          className={`filter-tab ${filter === 'in_progress' ? 'active' : ''}`}
          onClick={() => setFilter('in_progress')}
        >
          In Progress ({grievances.filter(g => g.status === 'in_progress').length})
        </button>
        <button
          className={`filter-tab ${filter === 'resolved' ? 'active' : ''}`}
          onClick={() => setFilter('resolved')}
        >
          Resolved ({grievances.filter(g => g.status === 'resolved').length})
        </button>
      </div>

      {filteredGrievances.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-inbox"></i>
          <p>No grievances found.</p>
          <Link to="/submit-grievance" className="btn btn-primary">Submit Your First Grievance</Link>
        </div>
      ) : (
        <div className="grievances-list">
          {filteredGrievances.map(grievance => (
            <div key={grievance._id} className="grievance-card">
              <div className="grievance-header">
                <h3>{grievance.subject}</h3>
                <span className={`status-badge status-${grievance.status}`}>
                  {grievance.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="grievance-meta">
                <span><i className="fas fa-tag"></i> {grievance.category}</span>
                <span><i className="fas fa-flag"></i> {grievance.priority}</span>
                <span><i className="fas fa-calendar"></i> {new Date(grievance.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="grievance-description">
                {grievance.description.length > 200 
                  ? grievance.description.substring(0, 200) + '...' 
                  : grievance.description}
              </p>
              <Link to={`/grievance/${grievance._id}`} className="btn btn-sm btn-outline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGrievances;

