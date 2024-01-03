import "./Header.css";
import { currentDate } from "../../utils/constants";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React from "react";

const Header = ({
  place,
  onCreateModal,
  isLoggedIn,
  onLoginModal,
  onRegisterModal,
  firstLetter,
}) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="header__date">
          {currentDate}, {place}
        </div>
      </div>

      <div className="header__avatar-logo">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            {currentUser.avatar ? (
              <div className="header__avatar-container">
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              </div>
            ) : (
              <div className="header__avatar-placeholder">{firstLetter}</div>
            )}

            <Link to="/profile" className="header__name">
              {`${currentUser.name}`}
            </Link>
          </>
        ) : (
          <>
            <div className="header__register" onClick={onRegisterModal}>
              Register
            </div>
            <div className="header__login" onClick={onLoginModal}>
              Log In
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

{
  /*  */
}
