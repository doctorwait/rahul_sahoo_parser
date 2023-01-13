import { useState } from 'react';
import { IconContext } from "react-icons";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineLogout, MdOutlineAccountCircle, MdSettings } from 'react-icons/md';
import '../assets/styles/CurrentUser.css';

function CurrentUser({ userData, clearUserData }) {
  const [menuIsOpen, setMenuState] = useState(false);

  function handleMenuToggle() {
    setMenuState(current => !current);
  }

  return (
    <div className="current-user">
      <h3 className="current-user__name">
        {userData.email}
      </h3>
      <button
        className="current-user__button"
        onClick={handleMenuToggle}
      >
        <IconContext.Provider value={{ className: 'current-user__button-icon' }}>
          {menuIsOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </IconContext.Provider>
      </button>
      {menuIsOpen &&
        <nav className="current-user__menu" >
          <ul className="current-user__menu-list" >
            <li className="current-user__menu-item" >
              <button className="current-user__menu-button" >
                <IconContext.Provider value={{ className: 'current-user__menu-button-icon' }}>
                  <MdOutlineAccountCircle />
                </IconContext.Provider>
                Account
              </button>
            </li>
            <li className="current-user__menu-item" >
              <button className="current-user__menu-button" >
                <IconContext.Provider value={{ className: 'current-user__menu-button-icon' }}>
                  <MdSettings />
                </IconContext.Provider>
                Settings
              </button>
            </li>
            <li className="current-user__menu-item" >
              <button
                className="current-user__menu-button"
                onClick={clearUserData}
              >
                <IconContext.Provider value={{ className: 'current-user__menu-button-icon' }}>
                  <MdOutlineLogout />
                </IconContext.Provider>
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      }
    </div>
  );
}

export default CurrentUser;