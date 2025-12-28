import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-backdrop" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="https://git-india.edu.in/wp-content/uploads/2025/06/GIT-logo-new-1024x271.jpg" 
                alt="GIT Logo" 
                className="navbar-logo"
              />
            </Link>
            
            {/* Hamburger Menu Button */}
            <button 
              className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Desktop Menu */}
            <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
                {user.userType === 'admin' && (
                  <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    <i className="fas fa-user-shield"></i>
                    <span>Admin Panel</span>
                  </Link>
                )}
                <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-user"></i>
                  <span>Profile</span>
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-user-plus"></i>
                  <span>Register User</span>
                </Link>
                <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Sign In</span>
                </Link>
              </>
            )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

