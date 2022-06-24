import { Link } from "react-router-dom";
import { FaGlobeAmericas, FaUser } from "react-icons/fa";
import { Avatar, Divider } from "@chakra-ui/react";

function Sidebar({ user }) {
  const { faculty, username } = user;

  return (
    <div className="sidebar">
      <header>
        <div class="image-text">
          <span class="avatar">
            <Avatar class="avatar" name={username} w="40px" h="40px" />
          </span>

          <div class="text header-text">
            <span class="username">@{username}</span>
            <span class="faculty">
              {faculty.length > 15 ? faculty.substring(0, 15) + "..." : faculty}
            </span>
          </div>
        </div>
      </header>

      <Divider />

      <ul className="sidebar-list">
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
      </ul>
    </div>
  );
}

export default Sidebar;
