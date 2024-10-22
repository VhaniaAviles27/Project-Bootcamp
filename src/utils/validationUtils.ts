export const validateInputPersonalData = (value: string) => {
    const noNumbers = /^[^0-9]*$/;
    return value.length >= 3 && noNumbers.test(value);
  };
  
  export const validateInputAddress = (value: string) => {
    return value.length >= 10;
  };
  
  export const validateInputPhone = (value: string) => {
    const onlyNumbers = /^[0-9]+$/;
    return value.length === 9 && onlyNumbers.test(value);
  };
  