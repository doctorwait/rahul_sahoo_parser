import { useState, useRef, useEffect } from 'react';
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { useLoadingContext } from '../contexts/LoadingContext';
import { IconContext } from "react-icons";
import { MdKeyboardArrowDown } from 'react-icons/md';
import CurrentUserMenu from './CurrentUserMenu';
import LoadingIcon from "./LoadingIcon";
import '../assets/styles/CurrentUser.css';

function CurrentUser({ handleLogout }) {
  const [menuIsOpen, setMenuState] = useState(false);
  const userMenuRef = useRef();
  const { currentUserData } = useCurrentUserContext();
  const { userDataLoading } = useLoadingContext();

  function handleMenuToggle() {
    if(!userDataLoading) {
      setMenuState(current => !current);
    }
  }

  function handleClickOutside(evt) {
    if (menuIsOpen && !userMenuRef.current.contains(evt.target)) {
      handleMenuToggle();
      window.removeEventListener('click', handleClickOutside);
    }
  }

  useEffect(() => {
    if (menuIsOpen) {
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
        <div className="current-user__data-wrapper">
          {userDataLoading ?
            <div className="current-user__loading-wrapper" >
              <LoadingIcon />
            </div>
            :
            <>
              <h3 className="current-user__name">
                {`${currentUserData.firstName} ${currentUserData.lastName}`}
              </h3>
              <p className="current-user__email">
                {currentUserData.email}
              </p>
            </>
          }
        </div>
        <button
          className="current-user__button"
          type='button'
        >
          <IconContext.Provider
            value={{ className: `current-user__button-icon ${menuIsOpen && 'current-user__button-icon_active'}` }}
          >
            <MdKeyboardArrowDown />
          </IconContext.Provider>
        </button>
      </div>
      {menuIsOpen &&
        <CurrentUserMenu
          handleLogout={handleLogout}
        />
      }
    </div>
  );
}

export default CurrentUser;