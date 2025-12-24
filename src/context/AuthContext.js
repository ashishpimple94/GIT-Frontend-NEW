import React, { createContext, useState, useEffect } from 'react';
import api from '../config/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/auth/me');
      setUser(res.data);
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const res = await api.post('/api/auth/login', { username, password });
      const { token: newToken, user: userData } = res.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL
        },
        code: error.code,
        name: error.name
      });
      
      // Better error message extraction
      let errorMessage = 'Login failed. Please check your connection.';
      
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Server error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        // Request was made but no response
        errorMessage = 'No response from server. Please check your internet connection.';
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/api/auth/register', userData);
      const { token: newToken, user: newUser } = res.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config?.url
      });
      // Enhanced error handling with field-specific errors
      const responseData = error.response?.data || {};
      const errorMessage = responseData.message || error.message || 'Registration failed. Please check your connection.';
      const errorArray = Array.isArray(responseData.errors) ? responseData.errors : [];
      const field = responseData.field || null;
      
      return {
        success: false,
        message: errorMessage,
        errors: errorArray,
        field: field
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // Token is automatically removed from requests via interceptor
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

