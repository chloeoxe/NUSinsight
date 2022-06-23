import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFileAlt, FaGlobeAmericas, FaHome, FaUser } from "react-icons/fa";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Avatar, Divider } from "@chakra-ui/react";

function Sidebar({ user }) {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const { faculty, username } = user;

  return (
    <div className={sidebar ? "sidebar" : "sidebar sidebar--close"}>
      <header>
        <div class="image-text">
          <span class="avatar">
            <Avatar class="avatar" name={username} w="45px" h="45px" />
          </span>

          <div class="text header-text">
            <span class="username">@{username}</span>
            <span class="faculty">
              {faculty.length > 15 ? faculty.substring(0, 15) + "..." : faculty}
            </span>
          </div>
        </div>
      </header>
      <header onClick={toggleSidebar}>
        {sidebar ? (
          <ChevronLeftIcon className="toggle" />
        ) : (
          <ChevronRightIcon className="toggle" />
        )}
      </header>

      <Divider />

      <ul className="sidebar-list">
        <li>
          <Link to="/">
            <FaHome id="icon" />
            <div id="title">Home</div>
          </Link>
        </li>
        <li>
          <Link to="/account">
            <FaUser id="icon" />
            <div id="title">My Profile</div>
          </Link>
        </li>
        <li>
          <Link to="/feed">
            <FaGlobeAmericas id="icon" />
            <div id="title">Survey Feed</div>
          </Link>
        </li>
        <li>
          <Link to="/createSurveyStart">
            <FaFileAlt id="icon" />
            <div id="title">Create Survey</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
