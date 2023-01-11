import useCollectInputsData from '../hooks/useCollectInputsData';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';

function LoginPopup({ handleClose }) {
  const { inputsValues, handleChange, clearInputsValues } = useCollectInputsData();

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(inputsValues);
    handleClose();
    clearInputsValues();
  }

  return (
    <PopupWithForm
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      buttonText="Sign in"
    >
      <FormInput
        id="email-input"
        type="email"
        name="email"
        placeholder="user@example.com"
        label="Email Address"
        value={inputsValues.email}
        handleChange={handleChange}
        place="popup"
      />
      <FormInput
        id="password-input"
        type="text"
        name="password"
        placeholder="Password"
        label="Password"
        value={inputsValues.password}
        handleChange={handleChange}
        place="popup"
      />
    </PopupWithForm>
  );
}

export default LoginPopup;