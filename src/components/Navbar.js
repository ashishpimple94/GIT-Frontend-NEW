import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <div className="brand-content">
              <img 
                src="https://git-india.edu.in/wp-content/uploads/2025/06/GIT-logo-new-1024x271.jpg" 
                alt="GIT Logo" 
                className="git-logo"
              />
            </div>
          </Link>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                {user.userType === 'admin' && (
                  <Link to="/admin" className="nav-link">Admin Panel</Link>
                )}
                <Link to="/profile" className="nav-link">Profile</Link>
                <button onClick={logout} className="nav-link btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link">Register User</Link>
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/admin/login" className="nav-link" style={{ color: '#ff6b6b', fontWeight: 'bold' }}>Admin Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

