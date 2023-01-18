import { useLoadingContext } from '../contexts/LoadingContext';
import { IconContext } from 'react-icons';
import { IoMdClose } from 'react-icons/io';
import '../assets/styles/PopupWithForm.css';
import PopupWrapper from './PopupWrapper';
import Logo from './Logo';
import LoadingIcon from './LoadignIcon';

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
        <button
          className="popup-form__submit-button"
          type="submit"
          disabled={formDataLoading}
        >
          {
            formDataLoading ?
              <div className="popup-form__loading-wrapper">
                <LoadingIcon />
              </div>
              :
              buttonText
          }
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