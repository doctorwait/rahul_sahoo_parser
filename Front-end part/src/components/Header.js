import '../assets/styles/Header.css';
import icon from '../assets/images/navigation-icon-white.svg';
import Logo from './Logo';

function Header({ openLoginPopup, openRegisterPopup, currentUser, clearUserData }) {
  return (
    <header className="header">
      <div className="header__content-wrapper">
        <Logo />
        {!currentUser.isLoggedIn &&
          <ul className="header__buttons">
            <li>
              <button
                className="header__button header__button_type_login"
                onClick={openLoginPopup}
              >
                <img src={icon} alt="button icon" className="header__button-icon" />
                Login
              </button>
            </li>
            <li>
              <button
                className="header__button header__button_type_register"
                onClick={openRegisterPopup}
              >
                <img src={icon} alt="button icon" className="header__button-icon" />
                Register
              </button>
            </li>
          </ul>
        }
        {currentUser.isLoggedIn &&
          <div className="header__current-user">
            <h3 className="header__user-name">
              {currentUser.data.email}
            </h3>
            <button
              className="header__button header__button_type_logout"
              onClick={clearUserData}
            >
              <img src={icon} alt="button icon" className="header__button-icon" />
              Logout
            </button>
          </div>
        }
      </div>
    </header>
  );
}

export default Header;