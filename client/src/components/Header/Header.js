import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="headerContainer">
        <Link to="/" className="logo">
          EXPTRACK
        </Link>
      </nav>
    </header>
  );
};

export default Header;
