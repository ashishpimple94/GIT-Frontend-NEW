import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import CustomSelect from '../components/CustomSelect';
import './SubmitGrievance.css';

const SubmitGrievance = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
    priority: 'medium'
  });
  const [files, setFiles] = useState([]);
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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file count
    if (files.length + selectedFiles.length > 5) {
      setError('Maximum 5 files allowed');
      return;
    }

    // Validate file sizes (10MB each)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const invalidFiles = selectedFiles.filter(file => file.size > maxSize);
    
    if (invalidFiles.length > 0) {
      setError(`Some files exceed 10MB limit: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 
                          'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                          'text/plain', 'text/csv'];
    
    const invalidTypes = selectedFiles.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidTypes.length > 0) {
      setError(`Invalid file types: ${invalidTypes.map(f => f.name).join(', ')}. Allowed: Images, PDF, Word, Excel, Text files`);
      return;
    }

    setFiles([...files, ...selectedFiles]);
    setError('');
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return 'fas fa-image';
    if (file.type === 'application/pdf') return 'fas fa-file-pdf';
    if (file.type.includes('word') || file.type.includes('document')) return 'fas fa-file-word';
    if (file.type.includes('excel') || file.type.includes('spreadsheet')) return 'fas fa-file-excel';
    if (file.type.includes('text')) return 'fas fa-file-alt';
    return 'fas fa-file';
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
      console.log('Submitting grievance:', formData);
      console.log('Files to upload:', files);

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('priority', formData.priority);

      // Append files
      files.forEach((file) => {
        formDataToSend.append('attachments', file);
      });

      console.log('[SUBMIT] Sending grievance to API:', {
        subject: formData.subject,
        category: formData.category,
        priority: formData.priority,
        filesCount: files.length,
        descriptionLength: formData.description.length
      });
      
      const res = await api.post('/api/grievances', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('[SUBMIT] ✅ Grievance submitted successfully:', res.data);
      console.log('[SUBMIT] Grievance ID:', res.data._id);
      console.log('[SUBMIT] ⚠️ Note: Confirmation email should be sent to your registered email address');
      setSuccess('Grievance submitted successfully! An email confirmation will be sent to your registered email.');
      setTimeout(() => {
        navigate('/my-grievances');
      }, 1500);
    } catch (error) {
      console.error('Error submitting grievance:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error message:', error.message);
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        setError(errorMessages);
      } else {
        setError(error.response?.data?.message || error.message || 'Failed to submit grievance');
      }
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
            <CustomSelect
              label="Category"
              icon="fas fa-tag"
              placeholder="Select Category"
              value={formData.category}
              onChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
              required={true}
              options={[
                { value: 'academic', label: 'Academic' },
                { value: 'administrative', label: 'Administrative' },
                { value: 'infrastructure', label: 'Infrastructure' },
                { value: 'hostel', label: 'Hostel' },
                { value: 'library', label: 'Library' },
                { value: 'examination', label: 'Examination' },
                { value: 'other', label: 'Other' }
              ]}
            />
            <CustomSelect
              label="Priority"
              icon="fas fa-flag"
              placeholder="Select Priority"
              value={formData.priority}
              onChange={(e) => handleChange({ target: { name: 'priority', value: e.target.value } })}
              required={false}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' }
              ]}
            />
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Describe your grievance in detail..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="attachments">
                <i className="fas fa-paperclip"></i> Attach Files (Optional)
              </label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  className="file-input"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                  onChange={handleFileChange}
                />
                <label htmlFor="attachments" className="file-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Choose Files or Drag & Drop</span>
                  <small>Max 5 files, 10MB each (Images, PDF, Word, Excel, Text)</small>
                </label>
              </div>
              {files.length > 0 && (
                <div className="file-preview-list">
                  {files.map((file, index) => (
                    <div key={index} className="file-preview-item">
                      <div className="file-info">
                        <i className={getFileIcon(file)}></i>
                        <div className="file-details">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="file-remove-btn"
                        onClick={() => removeFile(index)}
                        title="Remove file"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
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

