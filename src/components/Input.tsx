import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import '../styles/styleInput.css'

interface InputProps {
    typeData: string;
    icon: IconProp;
    placeholder: string;
    validate: (valueData: string) => boolean;
    errorMessage: string;
    options?: string[]; 
}

const Input: React.FC<InputProps> = ({ typeData, icon, placeholder, validate, errorMessage, options }) => {
    const [value, setValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        setIsValid(validate(inputValue));
    };

    return (
        <div className='inputContainer'>
            <label className="textData">{typeData}</label>
            <div className={`inputContent ${!isValid ? 'invalid' : ''}`}>
                <FontAwesomeIcon icon={icon} />
                {options ? (
                    <select value={value} onChange={handleChange} className={`customInput ${isValid ? '' : 'invalid'}`}>
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
                        className={`customInput ${isValid ? '' : 'invalid'}`}
                    />
                )}
            </div>
            {!isValid && <span className="errorMessage">{errorMessage}</span>}
        </div>
    );
};

export default Input;
