import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Book a Bite
        </Link>

        <div className="navbar-links">
          <Link to="/restaurants" className="navbar-button">
            Restaurants Near You
          </Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar-button logout-btn">
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" className="navbar-button">
                Sign In
              </Link>
              <Link to="/register" className="navbar-button">
                Sign Up
              </Link>
            </>
          )}

          <Link to="/register?role=admin" className="navbar-button">
            Business with Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
