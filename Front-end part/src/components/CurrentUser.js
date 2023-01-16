import { useState, useRef, useEffect } from 'react';
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { IconContext } from "react-icons";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import '../assets/styles/CurrentUser.css';
import CurrentUserMenu from './CurrentUserMenu';

function CurrentUser() {
  const [menuIsOpen, setMenuState] = useState(false);
  const userMenuRef = useRef();
  const { currentUserData } = useCurrentUserContext();

  function handleMenuToggle() {
    setMenuState(current => !current);
  }

  function handleClickOutside(evt) {
    if (menuIsOpen && !userMenuRef.current.contains(evt.target)) {
      handleMenuToggle();
      window.removeEventListener('click', handleClickOutside);
    }
  }

  useEffect(() => {
    if(menuIsOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    }
  }, [menuIsOpen]);

  return (
    <div
      ref={userMenuRef}
      className="current-user"
    >
      <div
        className="current-user__wrapper"
        onClick={handleMenuToggle}
      >
        <h3 className="current-user__name">
          {currentUserData.email}
        </h3>
        <button className="current-user__button" >
          <IconContext.Provider value={{ className: 'current-user__button-icon' }}>
            {menuIsOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </IconContext.Provider>
        </button>
      </div>
      { menuIsOpen && <CurrentUserMenu /> }
    </div>
  );
}

export default CurrentUser;