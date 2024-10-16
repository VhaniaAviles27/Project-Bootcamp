import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/styleInput.css';

interface InputProps {
    value: string;
    onChange: (value: string) => void; 
    typeData: string;
    icon: IconProp;
    placeholder: string;
    errorMessage: string;
    showError: boolean;
    options?: string[]; 
}

const Input: React.FC<InputProps> = ({
    value,
    onChange,
    typeData,
    icon,
    placeholder,
    errorMessage,
    showError,
    options,
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputValue = e.target.value;
        onChange(inputValue); 
    };

    return (
        <div className='inputContainer'>
            <label className="textData">{typeData}</label>
            <div className={`inputContent ${showError ? 'invalid' : ''}`}>
                <FontAwesomeIcon icon={icon} />
                {options ? (
                    <select value={value} onChange={handleChange} className={`customInput ${showError ? 'invalid' : ''}`}>
                        <option value="">{placeholder}</option>
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={`customInput ${showError ? 'invalid' : ''}`}
                    />
                )}
            </div>
            {showError && <span className="errorMessage">{errorMessage}</span>}
        </div>
    );
};

export default Input;
