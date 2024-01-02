import "./Header.css";
import { currentDate } from "../../utils/constants";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({
  place,
  onCreateModal,
  isLoggedIn,
  onLoginModal,
  onRegisterModal,
}) => {
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
            <div className="header__avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <Link to="/profile" className="header__name">
              Terrence Tegegne
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
