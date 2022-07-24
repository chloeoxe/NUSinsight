import { useState, useEffect } from "react";
import {
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset as resetUser } from "../features/auth/authSlice";
import { reset as resetSurveys } from "../features/surveys/surveySlice";
import { Text } from "@chakra-ui/react";
import Dropdown from "./Dropdown";
import React from "react";
import { useWindowDimensions } from "../helpers";

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

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 768) {
      setDropdown(false);
    }
  }, [width]);

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
            <li id="hamburger" onClick={toggleDropdown}>
              {dropdown ? (
                <FaTimes size="20px" />
              ) : (
                <FaBars size="20px" align-items="centre" color="white" />
              )}
            </li>
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
