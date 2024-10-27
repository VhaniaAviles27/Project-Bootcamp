import { renderHook } from "@testing-library/react";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useFetchData } from "../../hooks/useFetchData";
import { useFilterProducts } from "../../hooks/useFilterProducts";

jest.mock("../../hooks/useFetchData");
jest.mock("../../hooks/useFilterProducts");

describe("useFetchProducts", () => {
  const mockProducts = [
    { id: 1, name: "Product 1", category: "Category 1" },
    { id: 2, name: "Product 2", category: "Category 2" },
  ];

  beforeEach(() => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: mockProducts,
      loading: false,
      error: null,
    });

    (useFilterProducts as jest.Mock).mockReturnValue({
      filteredProducts: mockProducts,
      filterBySearch: jest.fn(),
      filterByCategory: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch products and apply filters", () => {
    const { result } = renderHook(() => useFetchProducts());
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.filterBySearch).toBeDefined();
    expect(result.current.filterByCategory).toBeDefined();
  });

  test("should set loading state correctly", () => {
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });
    const { result } = renderHook(() => useFetchProducts());
    expect(result.current.loading).toBe(true);
  });
  test("should set error state correctly", () => {
    const mockError = "Error fetching data";
    (useFetchData as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: mockError,
    })
    const { result } = renderHook(() => useFetchProducts());
    expect(result.current.error).toBe(mockError);
  });
});
