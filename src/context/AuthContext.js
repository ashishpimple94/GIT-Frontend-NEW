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
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log('Attempting login with username:', username);
      const res = await api.post('/api/auth/login', { username, password });
      console.log('Login response:', res.data);
      
      const { token: newToken, user: userData } = res.data;
      
      if (!userData) {
        return {
          success: false,
          message: 'Invalid response from server'
        };
      }
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error message:', error.message);
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        return {
          success: false,
          message: 'Cannot connect to server. Please check your internet connection and try again.'
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed. Please check your credentials.'
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('[REGISTER] Registration attempt started');
      console.log('[REGISTER] User data:', { ...userData, password: '***' });
      
      const res = await api.post('/api/auth/register', userData);
      console.log('[SUCCESS] Registration response:', res.data);
      
      const { token: newToken, user: newUser } = res.data;
      
      if (!newToken || !newUser) {
        console.error('[ERROR] Invalid response from server - missing token or user');
        return {
          success: false,
          message: 'Invalid response from server. Please try again.'
        };
      }
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(newUser);
      console.log('[SUCCESS] Registration successful, user logged in');
      return { success: true };
    } catch (error) {
      console.error('[ERROR] Registration error:', error);
      console.error('[ERROR] Error response:', error.response?.data);
      console.error('[ERROR] Error message:', error.message);
      console.error('[ERROR] Error code:', error.code);
      
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        return {
          success: false,
          message: 'Cannot connect to server. Please check your internet connection and try again.'
        };
      }
      
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        return {
          success: false,
          message: 'Please fix the following errors:',
          errors: error.response.data.errors
        };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Registration failed. Please try again.',
        errors: error.response?.data?.errors
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // Token removal is handled by the axios interceptor
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

