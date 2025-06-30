import React, { useContext, useState } from "react";
import LoginContext from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Assets/CSS/registeration.css";

function Login() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      navigate("/user");
    } else {
      alert("Please enter both email and password. ");
    }
  };

  return (
    <div className="auth-page">
      <div className="back-home-wrapper">
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          ← Back to Home
        </Link>
      </div>
      <div className="auth-box">
        <h2>🔐 Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Log In
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/SignUp">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
