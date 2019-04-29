import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav: React.FunctionComponent = () => {
  return (
    <nav>
      <NavLink to="/">View Entries</NavLink>
      <NavLink to="/new">Apply now</NavLink>
    </nav>
  );
};

export default Nav;
