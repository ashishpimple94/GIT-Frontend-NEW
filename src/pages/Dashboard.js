import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/axios';
import './Dashboard.css';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    resolved: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const res = await api.get('/api/grievances');
      
      // Filter out pending grievances for Recent Grievances section
      const nonPendingGrievances = res.data.filter(g => g.status !== 'pending');
      setGrievances(nonPendingGrievances.slice(0, 10));
      
      // Calculate stats
      const statsData = {
        pending: res.data.filter(g => g.status === 'pending').length,
        inProgress: res.data.filter(g => g.status === 'in_progress').length,
        resolved: res.data.filter(g => g.status === 'resolved').length,
        total: res.data.length
      };
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome! Track and manage your grievances here.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-pending">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card stat-progress">
          <div className="stat-icon">
            <i className="fas fa-spinner"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card stat-resolved">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <i className="fas fa-list"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Grievances</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/submit-grievance" className="btn btn-primary">
          <i className="fas fa-plus"></i> Submit New Grievance
        </Link>
        <Link to="/my-grievances" className="btn btn-secondary">
          <i className="fas fa-list"></i> View All Grievances
        </Link>
      </div>

      <div className="recent-grievances">
        <h2>Recent Grievances</h2>
        {grievances.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No grievances submitted yet. <Link to="/submit-grievance">Submit your first grievance</Link></p>
          </div>
        ) : (
          <div className="grievances-list">
            {grievances.map(grievance => (
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
                  {grievance.description.length > 150 
                    ? grievance.description.substring(0, 150) + '...' 
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
    </div>
  );
};

export default Dashboard;

