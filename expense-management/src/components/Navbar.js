// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <h2>Expense Manager</h2>
      </div>
      <div style={linkContainerStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/expenses" style={linkStyle}>Expenses</Link>
            <Link to="/stats" style={linkStyle}>Stats</Link>
            <button onClick={logout} style={logoutButtonStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Inline styles for simplicity
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
};

const logoStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const linkContainerStyle = {
  display: 'flex',
  gap: '15px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px',
  padding: '8px 16px',
  borderRadius: '4px',
};

const logoutButtonStyle = {
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Navbar;
