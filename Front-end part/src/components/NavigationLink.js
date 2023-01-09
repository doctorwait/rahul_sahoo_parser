import { Link } from 'react-router-dom';
import '../assets/styles/NavigationLink.css';

function NavigationLink({ img, link, title }) {
  return (
    <Link to={link} className="navigation-link">
      <img src={img} alt="link icon" className="navigation-link__icon" />
      <span className="navigation-link__title">
        {title}
      </span>
    </Link>
  );
}

export default NavigationLink;