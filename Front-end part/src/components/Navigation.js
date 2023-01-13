import { AiOutlineHome, AiFillHdd } from 'react-icons/ai';
import { BiBuilding, BiClipboard } from 'react-icons/bi';
import '../assets/styles/Navigation.css';
import NavigationLink from './NavigationLink';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__links-list">
        <li>
          <NavigationLink
            Icon={AiOutlineHome}
            link="#"
            title="Home"
          />
        </li>
        <li>
          <NavigationLink
            Icon={BiClipboard}
            link="#"
            title="Products"
          />
        </li>
        <li>
          <NavigationLink
            Icon={AiFillHdd}
            link="#"
            title="Resources"
          />
        </li>
        <li>
          <NavigationLink
            Icon={BiBuilding}
            link="#"
            title="Company"
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;