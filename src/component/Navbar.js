// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/update-flight" className="navbar-link">Update Flight</Link>
      </div>
    </nav>
  );
};

export default Navbar;
