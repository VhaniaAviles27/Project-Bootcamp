import "../styles/styleIcon.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  id?: string;
  icon: IconProp;
  size?: 'xs' | 'lg' | 'sm' | '1x' | '2x' | '3x' | '5x' | '7x' | '10x';
  color?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
    id, icon, size = '1x', color = 'black', onClick
}) => {
  return (
    <div id = {id} className="circleIcon">
      <FontAwesomeIcon icon={icon} size={size} color={color} onClick={onClick} />
    </div>
  );
};

export default Icon;
