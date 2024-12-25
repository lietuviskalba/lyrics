import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Lyrics</Link>
        </li>
        <li>
          <Link to="/songs">Songs</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/lyrics">Lyrics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
