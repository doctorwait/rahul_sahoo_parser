import useCollectInputsData from '../hooks/useCollectInputsData';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';

function RegisterPopup({ handleClose, handleRegister }) {
  const { inputsValues, handleCollectData } = useCollectInputsData();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(inputsValues);
  }

  return (
    <PopupWithForm
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      buttonText="Sign up"
    >
      <FormInput
        id="name-input"
        type="text"
        name="name"
        placeholder="Your name"
        label="Your name"
        value={inputsValues.name}
        handleChange={handleCollectData}
        place="popup"
        minLength="2"
        maxLength="32"
      />
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
    </PopupWithForm>
  );
}

export default RegisterPopup;