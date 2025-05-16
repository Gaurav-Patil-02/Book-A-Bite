import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        window.location.href = "/add-restaurant";
      } else {
        window.location.href = "/Home";
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/path-to-your-logo.png"
          alt="Book A Bite"
          className="login-logo"
        />
        <h2>Please enter your e-mail address and password</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
        <div className="social-login">
          <p>Sign in with</p>
          <div className="social-icons">
            <button className="social-icon facebook"></button>
            <button className="social-icon google"></button>
            <button className="social-icon twitter"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
  