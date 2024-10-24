import { renderHook } from "@testing-library/react";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import * as fetchDataModule from "../../hooks/useFetchData";

jest.mock("../../hooks/useFetchData");

describe("useFetchCategories", () => {
  const mockCategories = ["Electronics", "Books", "Fashion"];
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return categories, loading state, and error", () => {
    (fetchDataModule.useFetchData as jest.Mock).mockReturnValue({
      data: mockCategories,
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useFetchCategories());
    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("should handle loading state", () => {
    (fetchDataModule.useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    const { result } = renderHook(() => useFetchCategories());
    expect(result.current.categories).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  test("should handle error state", () => {
    const mockError = new Error("Network Error");
    (fetchDataModule.useFetchData as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
    });
    const { result } = renderHook(() => useFetchCategories());
    expect(result.current.categories).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError);
  });
});
