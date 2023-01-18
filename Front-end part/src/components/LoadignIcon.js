import { IconContext } from "react-icons";
import { BiLoader } from 'react-icons/bi';
import '../assets/styles/LoadingIcon.css';

function LoadingIcon() {
  return (
    <IconContext.Provider value={{ className: "loading-icon" }}>
      <BiLoader />
    </IconContext.Provider>
  );
}

export default LoadingIcon;