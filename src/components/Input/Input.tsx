import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styleInput.css";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  typeData: string;
  icon: IconProp;
  placeholder: string;
  errorMessage: string;
  showError: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  typeData,
  icon,
  placeholder,
  errorMessage,
  showError,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <div className="inputContainer">
      <label className="textData">{typeData}</label>
      <div className={`inputContent ${showError ? "invalid" : ""}`}>
        <FontAwesomeIcon icon={icon} />
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`customInput ${showError ? "invalid" : ""}`}
          />
      </div>
      {showError && <span className="errorMessage">{errorMessage}</span>}
    </div>
  );
};

export default Input;
