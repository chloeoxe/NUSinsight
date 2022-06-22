import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaGlobeAmericas,
  FaFileAlt,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Text } from "@chakra-ui/react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <Text className="logo" fontSize={40}>
            NUSinsight
          </Text>
          {/*<img src={logo} width="200" height="49.8" alt="App Logo" />*/}
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/createSurveyStart">
                <FaFileAlt /> Create Survey
              </Link>
            </li>
            <li>
              <Link to="/feed">
                <FaGlobeAmericas /> Feed
              </Link>
            </li>
            <li>
              <Link to="/account">
                <FaUser /> Account
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
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
