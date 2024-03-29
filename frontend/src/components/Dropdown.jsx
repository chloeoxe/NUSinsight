import React from "react";
import { Link } from "react-router-dom";

function Dropdown() {
  return (
    <div className="dropdown-menu">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/myforms">My Forms</Link>
        </li>
        <li>
          <Link to="/feed">My Feed</Link>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
