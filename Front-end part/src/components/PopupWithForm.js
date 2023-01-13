import { IconContext } from "react-icons";
import { IoMdClose } from 'react-icons/io';
import '../assets/styles/PopupWithForm.css';
import PopupWrapper from './PopupWrapper';
import Logo from './Logo';

function PopupWithForm({ handleClose, handleSubmit, buttonText, children }) {
  return (
    <PopupWrapper
      handleClose={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        className="popup-form"
      >
        <Logo
          black={true}
        />
        <fieldset className="popup-form__fieldset">
          {children}
        </fieldset>
        <button
          className="popup-form__submit-button"
          type="submit"
        >
          {buttonText}
        </button>
        <button
          className="popup-form__close-button"
          type="reset"
          onClick={handleClose}
        >
          <IconContext.Provider value={{ className: "popup-form__close-button-icon" }}>
            <IoMdClose />
          </IconContext.Provider>
        </button>
      </form>
    </PopupWrapper>
  );
}

export default PopupWithForm;