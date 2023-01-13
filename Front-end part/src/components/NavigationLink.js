import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import '../assets/styles/NavigationLink.css';

function NavigationLink({ link, title, Icon }) {
  return (
    <Link to={link} className="navigation-link">
      <IconContext.Provider value={{ className: "navigation-link__icon" }}>
        <Icon />
      </IconContext.Provider>
      <span className="navigation-link__title">
        {title}
      </span>
    </Link>
  );
}

export default NavigationLink;