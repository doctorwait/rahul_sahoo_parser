import '../assets/styles/FormInput.css';

function FormInput({ value, handleChange, label, id, type, name, placeholder, place = false }) {
  return (
    <div className="form-input" >
      <label
        htmlFor="keyword-input"
        className={`form-input__label ${place === "popup" && "form-input__label_place_popup"}`}
      >
        {label}
      </label>
      <input
        className={`form-input__input ${place === "popup" && "form-input__input_place_popup"}`}
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