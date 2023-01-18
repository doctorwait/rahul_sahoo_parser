import { IconContext } from "react-icons";
import { FaCheck } from 'react-icons/fa';
import '../assets/styles/FormCheckbox.css';

function FormCheckbox({ checked, label, id, name, handleChange, place = false }) {
  return (
    <div
      className={`form-checkbox ${place && "form-checkbox_place_" + place}`}
      onClick={handleChange}
    >
      <div className="form-checkbox__checkbox-wrapper" >
        <input
          className="form-checkbox__input"
          id={id}
          type="checkbox"
          name={name}
          onChange={handleChange}
          checked={checked}
        />
        <label
          className={`form-checkbox__checkbox ${place && "form-checkbox__input_place_" + place}`}
          htmlFor={id}
        >
          {checked &&
            <IconContext.Provider value={{ className: "form-checkbox__icon" }}>
              <FaCheck />
            </IconContext.Provider>
          }
        </label>
      </div>
      <p
        className={`form-checkbox__label ${place && "form-checkbox__label_place_" + place}`}
      >
        {label}
      </p>
    </div>
  );
}

export default FormCheckbox;