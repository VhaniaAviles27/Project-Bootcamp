import "./styleHeader.css";
import logoImage from "../../assets/images/imageLogo.jpg";

import { faHome, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Icon from "../../components/Icon/Icon";
import { useNavigate } from "react-router-dom";

type HeaderLayoutProps = {
  cartCount: number;
  cartPrice: number;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ cartCount, cartPrice }) => {
  const navigate = useNavigate();
  const handleNavigation = (path:string) => {
    navigate(path);
  }
  
  return (
      <div className="headerContainer">
        <div className="logoContainer">
          <img src={logoImage} className="logoImage" />
        </div>
        <nav className="containerIcon">
          <Icon icon={faHome}  onNavigate={() => handleNavigation("/")} />
          <Icon icon={faUser}  onNavigate={() => handleNavigation("/profile")} />
          <div className="cartContainer">
            <Icon icon={faShoppingCart} onNavigate={() => handleNavigation("/resume")} />
            <span className="cartCount">{cartCount}</span>
            <text>| Pay: ${cartPrice.toFixed(2)}</text>
          </div>
        </nav>
      </div>
  );
};

export default HeaderLayout;
