import Icon from "../../components/Icon/Icon";
import "./styleFooter.css";

import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const FooterLayout: React.FC = () => {
  return (
    <div className="footerContainer">
      <div className="copyrightContainer">
        <p className="textSimple">
          Copyrigth | All rights reserved Mrs. Moon Design Company
        </p>
      </div>
      <nav className="containerIcon">
        <Icon icon={faFacebook} size="1x" />
        <Icon icon={faInstagram} size="1x" />
        <Icon icon={faTiktok} size="1x" />
      </nav>
    </div>
  );
};

export default FooterLayout;
