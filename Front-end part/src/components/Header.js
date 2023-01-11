import '../assets/styles/Header.css';
import icon from '../assets/images/navigation-icon-white.svg';
import Logo from './Logo';

function Header({ openLoginPopup, openRegisterPopup }) {
  return (
    <header className="header">
      <div className="header__content-wrapper">
        <Logo />
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
      </div>
    </header>
  );
}

export default Header;