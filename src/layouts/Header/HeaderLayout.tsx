import "./styleHeader.css";
import logoImage from "../assets/images/imageLogo.jpg";

import { faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Icon from "../../components/Icon/Icon";

type HeaderLayoutProps = {
  cartCount: number;
  cartPrice: number;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ cartCount, cartPrice }) => {
  
  return (
      <div className="headerContainer">
        <div className="logoContainer">
          <img src={logoImage} className="logoImage" />
        </div>
        <nav className="containerIcon">
          <Icon icon={faHome} size="1x" to="/" />
          <Icon icon={faUser} size="1x" />
          <div className="cartContainer">
            <Icon icon={faShoppingCart} size="1x" to="/resume" />
            <span className="cartCount">{cartCount}</span>
            <text>| Pay: ${cartPrice.toFixed(2)}</text>
          </div>
        </nav>
      </div>
  );
};

export default HeaderLayout;
