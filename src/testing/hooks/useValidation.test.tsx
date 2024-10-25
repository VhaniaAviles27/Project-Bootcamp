import { renderHook, act } from '@testing-library/react';
import { useValidation } from '../../hooks/useValidation'; // Ajusta la ruta si es necesario
import { validateInputAddress, validateInputPersonalData, validateInputPhone } from '../../utils/validationUtils';

jest.mock('../../utils/validationUtils', () => ({
  validateInputAddress: jest.fn(),
  validateInputPersonalData: jest.fn(),
  validateInputPhone: jest.fn(),
}));

describe('useValidation', () => {
  beforeEach(() => {
    (validateInputAddress as jest.Mock).mockReturnValue(true);
    (validateInputPersonalData as jest.Mock).mockReturnValue(true);
    (validateInputPhone as jest.Mock).mockReturnValue(true);
  });

  it('should validate and set name', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.handleNameChange('John');
    });

    expect(result.current.name).toBe('John');
    expect(result.current.error.name).toBe(false);
    expect(validateInputPersonalData).toHaveBeenCalledWith('John');
  });

  it('should validate and set lastName', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.handleLastNameChange('Doe');
    });

    expect(result.current.lastName).toBe('Doe');
    expect(result.current.error.lastName).toBe(false);
    expect(validateInputPersonalData).toHaveBeenCalledWith('Doe');
  });

  it('should validate and set district', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.handleDistrictChange('District');
    });

    expect(result.current.district).toBe('District');
    expect(result.current.error.district).toBe(false);
  });

  it('should validate and set address', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.handleAddressChange('123 Main St');
    });

    expect(result.current.address).toBe('123 Main St');
    expect(result.current.error.address).toBe(false);
    expect(validateInputAddress).toHaveBeenCalledWith('123 Main St');
  });

  it('should validate and set reference', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.handleReferenceChange('Near Park');
    });

    expect(result.current.reference).toBe('Near Park');
    expect(result.current.error.reference).toBe(false);
    expect(validateInputAddress).toHaveBeenCalledWith('Near Park');
  });

  it('should validate and set phone', () => {
    const { result } = renderHook(() => useValidation());

    act(() => {
      result.current.handlePhoneChange('1234567890');
    });

    expect(result.current.phone).toBe('1234567890');
    expect(result.current.error.phone).toBe(false);
    expect(validateInputPhone).toHaveBeenCalledWith('1234567890');
  });
});
