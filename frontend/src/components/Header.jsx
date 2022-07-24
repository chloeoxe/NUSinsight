import { useState } from "react";
import { FaBars, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset as resetUser } from "../features/auth/authSlice";
import { reset as resetSurveys } from "../features/surveys/surveySlice";
import { Text } from "@chakra-ui/react";
import Dropdown from "./Dropdown";
import React from "react";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    dispatch(resetSurveys());
  };

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => setDropdown(!dropdown);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <Text className="logo" fontSize={40}>
            NUSinsight
          </Text>
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li id="link">
              <Link to="/myforms">My Forms</Link>
            </li>
            <li id="link">
              <Link to="/feed">My Feed</Link>
            </li>
            <FaBars
              className="hamburger-menu"
              size="20px"
              align-items="centre"
              color="white"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            />
            <li>
              <Link to="/login" onClick={onLogout}>
                <button className="btn">
                  <FaSignOutAlt /> Logout
                </button>
              </Link>
            </li>
            {dropdown && <Dropdown />}
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
