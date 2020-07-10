import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="header__nav">
        <h1 className="header__title">
          <Link to="/">Ohio Sports Message Board</Link>
        </h1>
      </nav>
    </div>
  );
};

export default Header;
