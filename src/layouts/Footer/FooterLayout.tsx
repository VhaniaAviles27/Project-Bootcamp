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
        <Icon icon={faFacebook} />
        <Icon icon={faInstagram} />
        <Icon icon={faTiktok}/>
      </nav>
    </div>
  );
};

export default FooterLayout;
