import "../styles/styleIcon.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from "react-router-dom";

interface IconProps {
  id?: string;
  icon: IconProp;
  size?: 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '5x' | '7x' | '10x';
  color?: string;
  to?: string;
}

const Icon: React.FC<IconProps> = ({
    id, icon, size = '1x', color = 'black', to
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if(to) {
      navigate(to);
    }
  }
  return (
    <div id = {id} className="circleIcon">
      <FontAwesomeIcon icon={icon} size={size} color={color} onClick={handleClick} />
    </div>
  );
};

export default Icon;
