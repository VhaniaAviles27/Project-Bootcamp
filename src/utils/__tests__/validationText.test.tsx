import { validateInputPersonalData, validateInputAddress, validateInputPhone } from '../validationsText';

describe('Validation Utils', () => {
  describe('validateInputPersonalData', () => {
    it('should return true for a valid name without numbers and minimum length of 3', () => {
      expect(validateInputPersonalData('John')).toBe(true);
    });
    it('should return false for a name with numbers', () => {
      expect(validateInputPersonalData('John1')).toBe(false);
    });
    it('should return false for a name with less than 3 characters', () => {
      expect(validateInputPersonalData('Jo')).toBe(false);
    });
  });

  describe('validateInputAddress', () => {
    it('should return true for an address with at least 10 characters', () => {
      expect(validateInputAddress('123 Main St')).toBe(true);
    });
    it('should return false for an address with less than 10 characters', () => {
      expect(validateInputAddress('Main St')).toBe(false);
    });
  });

  describe('validateInputPhone', () => {
    it('should return true for a valid phone number with exactly 9 digits', () => {
      expect(validateInputPhone('123456789')).toBe(true);
    });
    it('should return false for a phone number with less than 9 digits', () => {
      expect(validateInputPhone('12345678')).toBe(false);
    });
    it('should return false for a phone number with more than 9 digits', () => {
      expect(validateInputPhone('1234567890')).toBe(false);
    });
    it('should return false for a phone number with non-numeric characters', () => {
      expect(validateInputPhone('12345a789')).toBe(false);
    });
  });
});
