import { useState } from 'react';
import { validDistricts } from '../data/districts';

export const useValidateDistrict = () => {
    const [isValid, setIsValid] = useState<boolean>(true); 
    const [errorMessage, setErrorMessage] = useState<string>(''); 

    const validateDistrict = (district: string): boolean => {
        const isValidDistrict = validDistricts.includes(district);
        if (validDistricts.includes(district)) {
            setIsValid(true);
            setErrorMessage('');
        } else {
            setIsValid(false);
            setErrorMessage('Distrito no válido');
        }
        return isValidDistrict;
    };

    return { isValid, errorMessage, validateDistrict };
};
