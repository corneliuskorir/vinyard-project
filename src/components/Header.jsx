import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/vineyardlogo.png"; // Adjust the path to your logo image

function Header() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Suncrest Valley</h1>
      </div>
      <div>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
        <NavLink to="/shop" className="nav-link">
          Shop
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
