import "./styleIcon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface IconProps {
  icon: IconProp;
  onNavigate?: () => void;
}

const Icon: React.FC<IconProps> = ({
  icon,
  onNavigate,
}) => {
  return (
    <div  className="circleIcon" onClick={onNavigate} >
      <FontAwesomeIcon
        icon={icon}
      />
    </div>
  );
};

export default Icon;
