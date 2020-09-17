import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      There has been an unidentified error. Please return to our{" "}
      <Link to="/">home</Link> page
    </div>
  );
};

export default Error;
