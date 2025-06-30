import React from "react";
import "../Assets/CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        📚 Bookcast &copy; {new Date().getFullYear()} — All rights reserved.
      </p>
      <div className="footer-links">
        <a href="#hero">Home</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
