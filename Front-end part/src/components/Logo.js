import { IconContext } from "react-icons";
import { FcPicture } from 'react-icons/fc';
import '../assets/styles/Logo.css';

function Logo({ black = false }) {
  return (
    <div className="logo">
      <IconContext.Provider value={{ className: "logo__icon" }}>
        <FcPicture />
      </IconContext.Provider>
      <h2 className={`logo__text ${black ? "logo__text_color_black" : "logo__text_color_white"}`} >
        Logo
      </h2>
    </div>
  );
}

export default Logo;