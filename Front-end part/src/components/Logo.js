import '../assets/styles/Logo.css';
import iconWhite from '../assets/images/navigation-icon-white.svg';
import iconBlack from '../assets/images/navigation-icon-black.svg';

function Logo({ black = false }) {
  return (
    <div className="logo">
      <img src={black ? iconBlack : iconWhite} alt="company logo" className="logo__icon" />
      <h2 className={`logo__text ${black ? "logo__text_color_black" : "logo__text_color_white"}`} >
        Company Logo
      </h2>
    </div>
  );
}

export default Logo;