import '../assets/styles/FormInput.css';

function FormInput({ value, handleChange, label = false, id, type, name, placeholder, place = false }) {
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
        className={`form-input__input ${place && "form-input__input_place_" + place}`}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        minLength="2"
        required
        onChange={handleChange}
      />
    </div>
  );
}

export default FormInput;