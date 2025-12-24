import axios from 'axios';

// Set base URL based on environment
// Check if we're in production (Vercel) or development
// Use typeof window check to avoid SSR issues during build
const isProduction = process.env.NODE_ENV === 'production' || 
                     (typeof window !== 'undefined' && window.location.hostname !== 'localhost');

// For local development, use localhost:5001 directly (faster)
// For production, use Render URL
const API_BASE_URL = isProduction
  ? (process.env.REACT_APP_API_URL || 'https://git-grievance-system-backend.onrender.com')
  : 'http://localhost:5001'; // Direct localhost connection for faster local development

// Log for debugging (only in browser, not during build)
if (typeof window !== 'undefined') {
  console.log('API Base URL:', API_BASE_URL);
  console.log('Environment:', isProduction ? 'Production' : 'Development');
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

