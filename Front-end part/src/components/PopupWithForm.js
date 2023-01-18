import { useLoadingContext } from '../contexts/LoadingContext';
import { IconContext } from 'react-icons';
import { IoMdClose } from 'react-icons/io';
import '../assets/styles/PopupWithForm.css';
import PopupWrapper from './PopupWrapper';
import Logo from './Logo';
import MainButton from './MainButton';

function PopupWithForm({ handleClose, handleSubmit, buttonText, children }) {
  const { formDataLoading } = useLoadingContext();

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
        <MainButton
          type="submit"
          disabled={formDataLoading}
          text={buttonText}
          place="popup-form"
          isLoading={formDataLoading}
        />
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