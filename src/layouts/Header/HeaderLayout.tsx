import "./styleHeader.css";
import logoImage from "../../assets/images/imageLogo.jpg";
import {
  faHome,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routes/routesConfig";
import { useEffect, useState } from "react";
import { User } from "../../models/User";

type HeaderLayoutProps = {
  cartCount: number;
  cartPrice: number;
};

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  cartCount,
  cartPrice,
}) => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
  }, []);

  return (
    <div className="headerContainer">
      <div className="logoContainer">
        <img src={logoImage} className="logoImage" data-testid="logoImage" />
      </div>
      <div className = "welcomeMessage">
        <h3>Bienvenida {user?.firstName} {user?.lastName}</h3>
      </div>
      <nav className="containerIcon">
        <Icon
          icon={faHome}
          onNavigate={() => handleNavigation(RoutePaths.HOME)}
          data-testid="navHome"
        />
        <Icon
          icon={faUser}
          onNavigate={() => handleNavigation(RoutePaths.PROFILE)}
          data-testid="navProfile"
        />
        <div className="cartContainer">
          <Icon
            icon={faShoppingCart}
            onNavigate={() => handleNavigation(RoutePaths.RESUME)}
            data-testid="navResume"
          />
          <span className="cartCount">{cartCount}</span>
          <p>| Pay: ${cartPrice.toFixed(2)}</p>
        </div>
      </nav>
    </div>
  );
};

export default HeaderLayout;

