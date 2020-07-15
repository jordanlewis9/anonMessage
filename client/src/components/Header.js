import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="header__nav">
        <h1>
          <Link to="/" className="header__title">
            Ohio Sports Message Board
          </Link>
        </h1>
      </nav>
    </div>
  );
};

export default Header;
