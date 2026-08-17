import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>
          📧 Email:{" "}
          <a href="mailto:info@suncrestvalley.com">info@suncrestvalley.com</a>
        </p>
        <p>
          📞 Phone: <a href="tel:+254702485756">+254 702 485 756</a>
        </p>
        <p>&copy; 2026 Suncrest Valley. All rights reserved.</p>
      </div>
      <div className="footer-right">
        <nav className="footer-nav">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/shop" className="nav-link">
            Shop
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/events" className="nav-link">
            Events
          </NavLink>
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
