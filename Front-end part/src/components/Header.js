import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { IconContext } from "react-icons";
import { MdOutlineLogin, MdCreate } from 'react-icons/md';
import '../assets/styles/Header.css';
import Navigation from './Navigation';
import Logo from './Logo';
import CurrentUser from './CurrentUser';

function Header({ openLoginPopup, openRegisterPopup, handleLogout }) {
  const { userIsLogged } = useCurrentUserContext();

  return (
    <header className="header">
      <div className="header__content-wrapper">
        <Logo />
        <div className="header__menu-wrapper">
          <Navigation />
          {!userIsLogged &&
            <ul className="header__buttons">
              <li>
                <button
                  className="header__button header__button_type_login"
                  onClick={openLoginPopup}
                >
                  <IconContext.Provider value={{ className: 'header__button-icon' }}>
                    <MdOutlineLogin />
                  </IconContext.Provider>
                  Sign in
                </button>
              </li>
              <li>
                <button
                  className="header__button header__button_type_register"
                  onClick={openRegisterPopup}
                >
                  <IconContext.Provider value={{ className: 'header__button-icon' }}>
                    <MdCreate />
                  </IconContext.Provider>
                  Sign up
                </button>
              </li>
            </ul>
          }
          {userIsLogged &&
            <CurrentUser
              handleLogout={handleLogout}
            />
          }
        </div>
      </div>
    </header>
  );
}

export default Header;