import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";
// import logo from "/logo.png"

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      {/* Left side (Logo / Brand) */}
      <div className="nav-left">
        <span className="logo">Suraksha Setu</span>
      </div>

      {/* Right side (Links) */}
      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/report" className="nav-link">Report</Link>
        <Link to="/reports" className="nav-link">View Reports</Link>
        <Link to="/help" className="nav-link">Help</Link>
        <Link to="/police" className="nav-link">Nearby Police</Link>
        
        {user ? (
          <Link to="/profile" className="nav-btn profile-btn">
            Profile
          </Link>
        ) : (
          <Link to="/signup" className="nav-btn">Sign Up</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
