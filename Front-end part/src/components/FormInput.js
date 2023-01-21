import useInputValidation from '../hooks/useInputValidation';
import '../assets/styles/FormInput.css';

function FormInput(
    { value, handleChange, id, type, name, placeholder, label = false, place = false, validation=true, minLength, maxLength }
  ) {
  const { inputState, errorMessage, checkValidity } = useInputValidation();

  function onChange(evt) {
    handleChange(evt);
    checkValidity(evt);
  }

  return (
    <div className="form-input" >
      {label &&
        <label
          htmlFor={id}
          className={`form-input__label ${place && "form-input__label_place_" + place}`}
        >
          {label}
        </label>
      }
      <input
        className={
          `form-input__input
          ${place && "form-input__input_place_" + place}
          ${(validation && inputState) && "form-input__input_state_" + inputState}
          `
        }
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        minLength={minLength}
        maxLength={maxLength}
        required
        onChange={onChange}
      />
      {validation &&
        <p className="form-input__error-msg">
          {errorMessage}
        </p>
      }
    </div>
  );
}

export default FormInput;