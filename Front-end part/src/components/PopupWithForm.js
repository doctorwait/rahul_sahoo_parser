import { useLoadingContext } from '../contexts/LoadingContext';
import { IconContext } from 'react-icons';
import { IoMdClose } from 'react-icons/io';
import useFormValidation from '../hooks/useFormValidation';
import PopupWrapper from './PopupWrapper';
import Logo from './Logo';
import MainButton from './MainButton';
import '../assets/styles/PopupWithForm.css';

function PopupWithForm({ handleClose, handleSubmit, buttonText, children }) {
  const { formDataLoading } = useLoadingContext();
  const { isValid, handleValidityCheck } = useFormValidation();

  return (
    <PopupWrapper
      handleClose={handleClose}
    >
      <form
        onSubmit={handleSubmit}
        onChange={handleValidityCheck}
        className="popup-form"
        noValidate
      >
        <Logo
          black={true}
        />
        <fieldset className="popup-form__fieldset">
          {children}
        </fieldset>
        <MainButton
          type="submit"
          disabled={formDataLoading || !isValid}
          text={buttonText}
          place="popup-form"
          classType={formDataLoading && "form-loading"}
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