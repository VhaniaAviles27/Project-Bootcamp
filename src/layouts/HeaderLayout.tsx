import "../styles/styleHeader.css";
import logoImage from "../assets/images/image-logo.png";
import Icon from "../components/Icon";
import { faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

type HeaderLayoutProps = {
  cartCount: number;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ cartCount }) => {
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
        </div>
      </nav>
    </div>
  );
};

export default HeaderLayout;
