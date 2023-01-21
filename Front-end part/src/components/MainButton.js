import { IconContext } from "react-icons";
import LoadingIcon from "./LoadingIcon";
import '../assets/styles/MainButton.css';

function MainButton({ handleClick, text, place, Icon = false, type = 'button', disabled = false, isLoading = false, classType = false }) {
  return (
    <button
      className={
        `main-button
        ${place && "main-button_place_" + place}
        ${classType && "main-button_type_" + classType}`
      }
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {isLoading ?
        <div className="main-button__icon" >
          <LoadingIcon />
        </div>
        :
        <>
          {Icon &&
            <IconContext.Provider value={{ className: "main-button__icon" }}>
              <Icon />
            </IconContext.Provider>
          }
          <span className="main-button__text">
            {text}
          </span>
        </>
      }
    </button>
  );
}

export default MainButton;