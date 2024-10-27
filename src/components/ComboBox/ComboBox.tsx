import React from "react";
import "./styleComboBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Option = {
  value: string;
  label: string;
};

type ComboBoxProps = {
  options: Option[];
  onSelect: (selectedValue: string) => void; 
  selectedValue: string;
  typeData? : string;
  errorMessage? : string;
  showError? : boolean;
  icon?: IconProp;
};

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  onSelect,
  icon,
  typeData,
  selectedValue,
  errorMessage,
  showError,
}) => {
  const handleOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onSelect(event.target.value);
  };

  return (
    <div className={`comboBoxWrapper ${showError ? "invalid" : ""}`}>
      <label className="textData">{typeData}</label>
      <div className="comboBoxContainer">
        {icon && <FontAwesomeIcon icon={icon} className="comboBoxIcon"/>}
        <select
          className="principalCbo"
          value={selectedValue}
          onChange={handleOptionChange}
        >
          <option value="">-- Selecciona una opción --</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {showError && <span className="errorMessage">{errorMessage}</span>}
    </div>
    
  );
};

export default ComboBox;
