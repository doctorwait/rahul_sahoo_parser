import { useEffect } from "react";
import '../assets/styles/PopupWrapper.css';

function PopupWrapper({ handleClose, children }) {
  function handleClickOutside(evt) {
    if(evt.target === evt.currentTarget) {
      handleClose();
    }
  }

  function handleEscapeClose(evt) {
    if(evt.code === 'Escape') {
      handleClose();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeClose);

    return () => {
      window.removeEventListener('keydown', handleEscapeClose);
    }
  }, []);

  return (
    <div
      className="popup-wrapper"
      onClick={handleClickOutside}
    >
      {children}
    </div>
  );
}

export default PopupWrapper;