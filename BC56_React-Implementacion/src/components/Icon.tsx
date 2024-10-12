import "../styles/styleIcon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconProps {
    icon: IconDefinition;
    onClick: () => void;
}

const Icon: React.FC<IconProps> = ({ icon, onClick }) => {
    return (
        <div className="circleIcon">
            <button className="buttonIcon" onClick={onClick}>
                <FontAwesomeIcon icon={icon} />
            </button>
        </div>
    );
}

export default Icon;
