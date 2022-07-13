import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset as resetUser } from "../features/auth/authSlice";
import { reset as resetSurveys } from "../features/surveys/surveySlice";
import { Text } from "@chakra-ui/react";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
    dispatch(resetSurveys());
  };

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
            <li>
              <Link to="/myforms">My Forms</Link>
            </li>
            <li>
              <Link to="/feed">My Feed</Link>
            </li>
            <li>
              <Link to="/login" onClick={onLogout}>
                <button className="btn">
                  <FaSignOutAlt /> Logout
                </button>
              </Link>
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
