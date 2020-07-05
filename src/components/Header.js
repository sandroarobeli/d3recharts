import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/base.css";

const Header = () => (
  <header>
    <h1>FreeCodeCamp D3 Certification Projects with recharts library</h1>
    <NavLink
      to="/"
      exact={true}
      activeClassName="is-active"
      className="initial"
    >
      Main
    </NavLink>
    <NavLink to="/usgdp" activeClassName="is-active" className="initial">
      US GDP Histogram
    </NavLink>
    <NavLink to="/doping" activeClassName="is-active" className="initial">
      Cycler Doping Scatter Plot
    </NavLink>
    <NavLink to="/project3" activeClassName="is-active" className="initial">
      Project 3
    </NavLink>
    <NavLink to="/project4" activeClassName="is-active" className="initial">
      Project 4
    </NavLink>
    <NavLink to="/project5" activeClassName="is-active" className="initial">
      Project 5
    </NavLink>
    <NavLink to="/contact" activeClassName="is-active" className="initial">
      Contact Us
    </NavLink>
  </header>
);

export default Header;
