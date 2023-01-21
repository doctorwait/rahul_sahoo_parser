import { useState } from 'react';
import useCollectInputsData from '../hooks/useCollectInputsData';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';
import FormCheckbox from './FormCheckbox';

function LoginPopup({ handleClose, handleLogin }) {
  const [ keepSignIn, setKeepSignIn ] = useState(false);
  const { inputsValues, handleCollectData } = useCollectInputsData();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(inputsValues, keepSignIn);
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
        handleChange={handleCollectData}
        place="popup"
      />
      <FormInput
        id="password-input"
        type="text"
        name="password"
        placeholder="Password"
        label="Password"
        value={inputsValues.password}
        handleChange={handleCollectData}
        place="popup"
        minLength="4"
        maxLength="16"
      />
      <FormCheckbox
        id="keep-sign-in"
        name="keepSignIn"
        label="Keep me signed in"
        place="popup"
        checked={keepSignIn}
        handleChange={() => setKeepSignIn(current => !current)}
      />
    </PopupWithForm>
  );
}

export default LoginPopup;