import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/axios';
import './ViewGrievance.css';

const ViewGrievance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchGrievance = useCallback(async () => {
    try {
      const res = await api.get(`/api/grievances/${id}`);
      setGrievance(res.data.grievance);
      setComments(res.data.comments || []);
    } catch (error) {
      console.error('Error fetching grievance:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGrievance();
  }, [fetchGrievance]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post(`/api/grievances/${id}/comments`, {
        comment: newComment
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
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

  if (!grievance) {
    return (
      <div className="container">
        <div className="empty-state">
          <p>Grievance not found</p>
          <button onClick={() => navigate('/my-grievances')} className="btn btn-primary">
            Back to Grievances
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="view-grievance">
        <button onClick={() => navigate('/my-grievances')} className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i> Back
        </button>

        <div className="card grievance-detail">
          <div className="grievance-detail-header">
            <h1>{grievance.subject}</h1>
            <span className={`status-badge status-${grievance.status}`}>
              {grievance.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grievance-detail-meta">
            <div className="meta-item">
              <strong>Category:</strong> {grievance.category}
            </div>
            <div className="meta-item">
              <strong>Priority:</strong> {grievance.priority}
            </div>
            <div className="meta-item">
              <strong>Submitted:</strong> {new Date(grievance.createdAt).toLocaleString()}
            </div>
            {grievance.assignedTo && (
              <div className="meta-item">
                <strong>Assigned To:</strong> {grievance.assignedTo.fullName || grievance.assignedTo.username}
              </div>
            )}
          </div>

          <div className="grievance-description">
            <h3>Description</h3>
            <p>{grievance.description}</p>
          </div>

          {grievance.resolution && (
            <div className="grievance-resolution">
              <h3>Resolution</h3>
              <p>{grievance.resolution}</p>
            </div>
          )}

          {grievance.attachments && grievance.attachments.length > 0 && (
            <div className="grievance-attachments">
              <h3>
                <i className="fas fa-paperclip"></i> Attachments ({grievance.attachments.length})
              </h3>
              <div className="attachments-list">
                {grievance.attachments.map((attachment, index) => (
                  <a
                    key={index}
                    href={`${process.env.REACT_APP_API_URL || 'https://git-backend-new.onrender.com'}/uploads/${attachment.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="attachment-link"
                  >
                    <i className="fas fa-file"></i>
                    <span>{attachment.fileName}</span>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card comments-section">
          <h2>Comments</h2>
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet</p>
            ) : (
              comments.map(comment => (
                <div key={comment._id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.userId.fullName || comment.userId.username}</strong>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewGrievance;

