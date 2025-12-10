import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { auth } from '../utils/auth';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleSignOut = () => {
    auth.signOut();
    setUser(null);
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <img src={logo} alt="Triunity Logo" className="logo-img" />
          <span className="logo-text">TRIUNITY</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/booking" className="nav-link">Book Wedding</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          
          {user ? (
            <>
              <span className="nav-link">Welcome, {user.firstName}</span>
              <button onClick={handleSignOut} className="btn btn-primary btn-sm">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: 'var(--secondary-color)',
            display: 'none'
          }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{
          backgroundColor: 'white',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div className="flex flex-col gap-4">
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/booking" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Book Wedding</Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            
            {user ? (
              <>
                <span className="nav-link">Welcome, {user.firstName}</span>
                <button onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }} className="btn btn-primary">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;