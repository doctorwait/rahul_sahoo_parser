import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { MdOutlineLogin, MdCreate } from 'react-icons/md';
import Navigation from './Navigation';
import Logo from './Logo';
import CurrentUser from './CurrentUser';
import MainButton from "./MainButton";
import '../assets/styles/Header.css';

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
                <MainButton
                  Icon={MdOutlineLogin}
                  text="Sign in"
                  place="header-login"
                  handleClick={openLoginPopup}
                />
              </li>
              <li>
                <MainButton
                  Icon={MdCreate}
                  text="Sign up"
                  place="header-register"
                  handleClick={openRegisterPopup}
                />
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