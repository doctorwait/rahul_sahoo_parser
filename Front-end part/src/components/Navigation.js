import '../assets/styles/Navigation.css';
import NavigationLink from './NavigationLink';
import icon from '../assets/images/navigation-icon.svg';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__links-list">
        <li>
          <NavigationLink
            img={icon}
            link="#"
            title="Home"
          />
        </li>
        <li>
          <NavigationLink
            img={icon}
            link="#"
            title="Search"
          />
        </li>
        <li>
          <NavigationLink
            img={icon}
            link="#"
            title="Plans"
          />
        </li>
        <li>
          <NavigationLink
            img={icon}
            link="#"
            title="Filters"
          />
        </li>
        <li>
          <NavigationLink
            img={icon}
            link="#"
            title="FAQ"
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;