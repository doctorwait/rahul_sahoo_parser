import '../assets/styles/Footer.css';
import icon from '../assets/images/navigation-icon-white.svg';
import iconBlack from '../assets/images/navigation-icon-black.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contacts-wrapper">
        <div className="footer__contacts" >
          <h3 className="footer__contacts-title">
            Get connected with us on social networks!
          </h3>
          <ul className="footer__contacts-links">
            <li>
              <a href="#" className="footer__contacts-link" >
                <img src={icon} alt="link icon" className="footer__contacts-link-icon" />
              </a>
            </li>
            <li>
              <a href="#" className="footer__contacts-link" >
                <img src={icon} alt="link icon" className="footer__contacts-link-icon" />
              </a>
            </li>
            <li>
              <a href="#" className="footer__contacts-link" >
                <img src={icon} alt="link icon" className="footer__contacts-link-icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__info">
        <div className="footer__info-column" >
          <h3 className="footer__info-column-title" >
            Company name
          </h3>
          <p className="footer__info-column-text" >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="footer__info-column" >
          <h3 className="footer__info-column-title" >
            More
          </h3>
          <ul className="footer__info-column-links" >
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__info-column" >
          <h3 className="footer__info-column-title" >
            Links
          </h3>
          <ul className="footer__info-column-links" >
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                Link
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__info-column" >
          <h3 className="footer__info-column-title" >
            Information
          </h3>
          <ul className="footer__info-column-links" >
            <li>
              <a href="#" className="footer__info-column-link" >
                <img src={iconBlack} alt="link icon" className="footer__info-column-link-icon" />
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                <img src={iconBlack} alt="link icon" className="footer__info-column-link-icon" />
                Link
              </a>
            </li>
            <li>
              <a href="#" className="footer__info-column-link" >
                <img src={iconBlack} alt="link icon" className="footer__info-column-link-icon" />
                Link
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright" >
        <p className="footer__copyright-text" >
          &copy; Copyright 2023. Registered Company Number: 1234567
        </p>
      </div>
    </footer>
  );
}

export default Footer;