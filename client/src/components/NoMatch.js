import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      This page does not exist. Please return to our <Link to="/">home</Link>{" "}
      page.
    </div>
  );
};

export default NoMatch;
