import "./Header.css";
import { currentDate } from "../../utils/constants";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";

const Header = ({ place, onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logo} alt="logo" />
        </div>

        <div className="header__date">
          {currentDate}, {place}
        </div>
      </div>

      <div className="header__avatar-logo">
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <div className="header__name">Aidan W</div>
        <div className="header__avatar">
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
