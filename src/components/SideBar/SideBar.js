import React from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ handleEditProfileModal, handleLogOut }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar__header">
      <div className="sidebar__avatar-and-name">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="avatar"
        />
        <div className="sidebar__name">{currentUser.name}</div>
      </div>
      <div className="sidebar__change-data" onClick={handleEditProfileModal}>
        Change Profile Data
      </div>
      <div className="sidebar__logout" onClick={handleLogOut}>
        Log Out
      </div>
    </div>
  );
};

export default SideBar;
