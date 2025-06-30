import React, { useContext } from "react";
import LoginContext from "../Context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Assets/CSS/navbar.css";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item me-3">
            <Link to="/" className="nav-link">
              🏠 Home
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link to="/Books" className="nav-link">
              🛒 Books
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item me-3">
              <Link to="/user" className="nav-link">
                {" "}
                User
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item me-3">
              <Link to="/favorites" className="nav-link">
                💛Favorites ({favorites.length})
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item me-3">
              <Link to="/Checkout" className="nav-link">
                {" "}
                Checkout
              </Link>
            </li>
          )}
          {!isLoggedIn ? (
            <li className="nav-item me-3">
              <Link to="/login" className="nav-link">
                {" "}
                LogIn
              </Link>
            </li>
          ) : (
            <li className="nav-item me-3">
              <button type="button" className="btn" onClick={handleLogout}>
                Log out{" "}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
