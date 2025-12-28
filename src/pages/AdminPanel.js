import React, { useState, useEffect, useCallback } from 'react';
import api from '../config/axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [grievances, setGrievances] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    priority: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: '',
    resolution: ''
  });

  const fetchGrievances = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.category) params.append('category', filters.category);
      if (filters.priority) params.append('priority', filters.priority);

      const res = await api.get(`/api/admin/grievances?${params.toString()}`);
      setGrievances(res.data);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGrievances();
    fetchStats();
  }, [fetchGrievances]);

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/admin/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleUpdateGrievance = async () => {
    try {
      await api.put(`/api/admin/grievances/${selectedGrievance._id}`, updateData);
      fetchGrievances();
      fetchStats();
      setSelectedGrievance(null);
      setUpdateData({ status: '', resolution: '' });
      alert('Grievance updated successfully!');
    } catch (error) {
      alert('Failed to update grievance');
      console.error('Error updating grievance:', error);
    }
  };

  if (loading && !stats) {
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
      <div className="admin-panel">
        <h1>Admin Panel</h1>

        {stats && (
          <div className="admin-stats">
            <div className="stat-box">
              <h3>Total</h3>
              <p>{stats.totalGrievances}</p>
            </div>
            <div className="stat-box">
              <h3>Pending</h3>
              <p>{stats.pending}</p>
            </div>
            <div className="stat-box">
              <h3>In Progress</h3>
              <p>{stats.inProgress}</p>
            </div>
            <div className="stat-box">
              <h3>Resolved</h3>
              <p>{stats.resolved}</p>
            </div>
            <div className="stat-box">
              <h3>Rejected</h3>
              <p>{stats.rejected}</p>
            </div>
          </div>
        )}

        <div className="admin-filters">
          <select
            className="form-control"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            className="form-control"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            <option value="academic">Academic</option>
            <option value="administrative">Administrative</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="hostel">Hostel</option>
            <option value="library">Library</option>
            <option value="examination">Examination</option>
            <option value="other">Other</option>
          </select>
          <select
            className="form-control"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="grievances-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>User</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map(grievance => (
                <tr key={grievance._id}>
                  <td>{grievance._id.substring(0, 8)}...</td>
                  <td>{grievance.subject}</td>
                  <td>{grievance.userId?.fullName || grievance.userId?.username}</td>
                  <td>{grievance.category}</td>
                  <td>
                    <span className={`priority-badge priority-${grievance.priority}`}>
                      {grievance.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${grievance.status}`}>
                      {grievance.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{new Date(grievance.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setSelectedGrievance(grievance);
                        setUpdateData({
                          status: grievance.status,
                          resolution: grievance.resolution || ''
                        });
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedGrievance && (
          <div className="modal-overlay" onClick={() => setSelectedGrievance(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Update Grievance</h2>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resolution</label>
                <textarea
                  className="form-control"
                  value={updateData.resolution}
                  onChange={(e) => setUpdateData({ ...updateData, resolution: e.target.value })}
                  rows="5"
                  placeholder="Enter resolution details..."
                ></textarea>
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={handleUpdateGrievance}>
                  Update
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedGrievance(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

