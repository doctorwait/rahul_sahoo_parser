import '../assets/styles/Header.css';
import icon from '../assets/images/navigation-icon-white.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__content-wrapper">
        <div className="header__logo">
          <img src={icon} alt="company logo" className="header__logo-icon" />
          <h2 className="header__logo-text" >
            Company Logo
          </h2>
        </div>
        <ul className="header__buttons">
          <li>
            <button className="header__button header__button_type_login" >
              <img src={icon} alt="button icon" className="header__button-icon" />
              Login
            </button>
          </li>
          <li>
            <button className="header__button header__button_type_register" >
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