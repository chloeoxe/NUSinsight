import React from "react";
import { FaFolder, FaFolderPlus, FaStar, FaTrashAlt } from "react-icons/fa";

function FormSidebar() {
  return (
    <div className="form-sidebar">
      <div className="forms-list">
        <div className="text header-text">MY FORMS</div>
        <ul>
          <li>
            <FaFolder id="icon" />
            <div className="text item-text">All Forms</div>
          </li>
          <li>
            <FaFolderPlus id="icon" />
            <div className="text subtext">Create a new folder</div>
          </li>
        </ul>
      </div>

      <hr></hr>

      <div className="drafts-list">
        <div className="text header-text">MY DRAFTS</div>
        <ul>
          <li>
            <FaFolder id="icon" />
            <div className="text item-text">All Drafts</div>
          </li>
          <li>
            <FaFolderPlus id="icon" />
            <div className="text subtext">Create a new folder</div>
          </li>
        </ul>
      </div>

      <hr></hr>

      <div className="bottom-content">
        <ul>
          <li>
            <FaStar id="icon" color="#FFB208" />
            <div className="text item-text">Favourites</div>
          </li>
          <li>
            <FaTrashAlt id="icon" />
            <div className="text item-text">Trash</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FormSidebar;
