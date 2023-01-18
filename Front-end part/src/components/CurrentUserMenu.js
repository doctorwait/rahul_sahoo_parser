import { IconContext } from "react-icons";
import { MdOutlineLogout, MdOutlineAccountCircle, MdSettings } from 'react-icons/md';
import '../assets/styles/CurrentUserMenu.css';

function CurrentUserMenu({ handleLogout }) {
  return (
    <nav className="user-menu" >
      <ul className="user-menu__list" >
        <li className="user-menu__list-item" >
          <button className="user-menu__button" >
            <IconContext.Provider value={{ className: 'user-menu__button-icon' }}>
              <MdOutlineAccountCircle />
            </IconContext.Provider>
            Account
          </button>
        </li>
        <li className="user-menu__list-item" >
          <button className="user-menu__button" >
            <IconContext.Provider value={{ className: 'user-menu__button-icon' }}>
              <MdSettings />
            </IconContext.Provider>
            Settings
          </button>
        </li>
        <li className="user-menu__list-item" >
          <button
            className="user-menu__button"
            onClick={handleLogout}
          >
            <IconContext.Provider value={{ className: 'user-menu__button-icon' }}>
              <MdOutlineLogout />
            </IconContext.Provider>
            Sign out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default CurrentUserMenu;