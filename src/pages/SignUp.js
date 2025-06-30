import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Assets/CSS/registeration.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Here you'd call an API or save user info
    alert("✅ Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="back-home-wrapper">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← Back to Home
        </Link>
      </div>
      <div className="auth-box">
        <h2>📝 Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              required
              value={password}
              placeholder="Confirm password"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
