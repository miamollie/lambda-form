import React from "react";
import "./Header.css";

const Header: React.FunctionComponent = props => (
  <header>{props.children}</header>
);

export default Header;
