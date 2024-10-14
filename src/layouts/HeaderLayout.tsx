import "../styles/styleHeader.css";
import logoImage from "../assets/images/image-logo.png";
import Icon from "../components/Icon";
import { faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

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
        <Icon icon={faHome} size="1x" />
        <Icon icon={faUser} size="1x" />
        <div className="cartContainer">
          <Icon icon={faShoppingCart} size="1x" />
          <span className="cartCount">{cartCount}</span>
          <text>| Pay: ${cartPrice}</text>
        </div>
      </nav>
    </div>
  );
};

export default HeaderLayout;
