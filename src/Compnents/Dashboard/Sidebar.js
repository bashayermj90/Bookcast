import React from "react";
import { Link } from "react-router-dom";

function sidebar() {
  return (
    <div className="sidebar">
      <h2>Bookcast</h2>
      <nav>
        <Link to="/user">Dashboard</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/books">Browse</Link>
        <Link to="/">Back to Home</Link>
      </nav>
    </div>
  );
}

export default sidebar;
