import { renderHook, waitFor } from "@testing-library/react";
import { useFetchData } from "../../hooks/useFetchData";

global.fetch = jest.fn();

describe("useFetchData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return data successfully", async () => {
    const mockData = { products: [{ id: 1, name: "Product 1" }] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const { result } = renderHook(() => useFetchData("https://dummyjson.com/products"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(mockData.products);
    expect(result.current.error).toBe(null);
  });

  test("should handle fetch error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });
    const { result } = renderHook(() => useFetchData("https://dummyjson.com/products"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Error fetching data: Not Found");
  });

  test("should handle network error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));
    const { result } = renderHook(() => useFetchData("https://dummyjson.com/products"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Network Error");
  });

  
});