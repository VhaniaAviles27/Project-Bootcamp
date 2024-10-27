import { renderHook, act } from "@testing-library/react";
import { useValidateDistrict } from "../../hooks/useDistrict";

jest.mock("../../data/districts", () => ({
  validDistricts: ["Lima", "Miraflores", "San Isidro"], 
}));

describe("useValidateDistrict hook", () => {
  test("should initialize with valid state", () => {
    const { result } = renderHook(() => useValidateDistrict());
    expect(result.current.isValid).toBe(true);
    expect(result.current.errorMessage).toBe("");
  });

  test("should validate a correct district", () => {
    const { result } = renderHook(() => useValidateDistrict());
    act(() => {
      const isValid = result.current.validateDistrict("Lima");
      expect(isValid).toBe(true);
    });
    expect(result.current.isValid).toBe(true);
    expect(result.current.errorMessage).toBe("");
  });

  test("should invalidate an incorrect district", () => {
    const { result } = renderHook(() => useValidateDistrict());
    act(() => {
      const isValid = result.current.validateDistrict("Incorrect District");
      expect(isValid).toBe(false);
    });
    expect(result.current.isValid).toBe(false);
    expect(result.current.errorMessage).toBe("Distrito no válido");
  });
});
