import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CatalogPage from "../CatalogPage";
import { useFetchData } from "../../../hooks/data/useFetchData";
import { useFilterProducts } from "../../../hooks/data/useFilterProducts";
import { CartProvider } from "../../../hooks/cart/cartContext";

jest.mock("../../../hooks/data/useFetchData");
jest.mock("../../../hooks/data/useFilterProducts");

const mockProducts = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  title: `Product ${index + 1}`,
  thumbnail: `image${index + 1}.jpg`,
  stock: 10,
  price: (index + 1) * 10,
}));

const mockCategories = [
  { slug: "category1", name: "Category 1" },
  { slug: "category2", name: "Category 2" },
];

describe("CatalogPage", () => {
  beforeEach(() => {
    (useFetchData as jest.Mock).mockImplementation((url) => {
      if (url === "PRODUCTS_URL") {
        return { data: mockProducts, loading: false, error: null };
      } else if (url === "CATEGORIES_URL") {
        return { data: mockCategories, loading: false, error: null };
      }
      return { data: [], loading: true, error: null };
    });

    (useFilterProducts as jest.Mock).mockImplementation((products) => ({
      filterBySearch: jest.fn(),
      filterByCategory: jest.fn(),
      filteredProducts: products,
    }));
  });

  it("should render the CatalogPage correctly", () => {
    render(
      <CartProvider>
        <CatalogPage />
      </CartProvider>
    );

    expect(screen.getByText("PRODUCTOS")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Product 1/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Product 2/i })).toBeInTheDocument();
  });

  it("should filter products based on search input", async () => {
    render(
      <CartProvider>
        <CatalogPage />
      </CartProvider>
    );

    const searchInput = screen.getByTestId("search");
    fireEvent.change(searchInput, { target: { value: "Product 1" } });

    await waitFor(() => {
      expect(screen.getByRole("img", { name: /Product 1/i })).toBeInTheDocument();
      expect(screen.queryByRole("img", { name: /Product 2/i })).not.toBeInTheDocument();
    });
  });

  it("should filter products based on category selection", async () => {
    render(
      <CartProvider>
      <CatalogPage />
    </CartProvider>
    );

    const comboBox = screen.getByRole("combobox");
    fireEvent.change(comboBox, { target: { value: "category1" } });

    await waitFor(() => {
      // Verifica que se filtren los productos según la categoría seleccionada
      expect(screen.getByRole("img", { name: /Product 1/i })).toBeInTheDocument();
      expect(screen.getByRole("img", { name: /Product 2/i })).toBeInTheDocument();
    });
  });

  it("should show loading indicator when loading", () => {
    (useFetchData as jest.Mock).mockImplementation(() => ({
      data: [],
      loading: true,
      error: null,
    }));

    render(
      <CartProvider>
        <CatalogPage />
      </CartProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should show error message when there is an error", () => {
    (useFetchData as jest.Mock).mockImplementation(() => ({
      data: [],
      loading: false,
      error: "Error fetching data",
    }));

    render(
      <CartProvider>
        <CatalogPage />
      </CartProvider>
    );

    expect(screen.getByText("Error: Error fetching data")).toBeInTheDocument();
  });

  it("should paginate products correctly", async () => {
    render(
      <CartProvider>
        <CatalogPage />
      </CartProvider>
    );

    expect(screen.getByRole("img", { name: /Product 1/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Product 10/i })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Product 11/i })).not.toBeInTheDocument();
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByRole("img", { name: /Product 11/i })).toBeInTheDocument();
      expect(screen.getByRole("img", { name: /Product 20/i })).toBeInTheDocument();
      expect(screen.queryByRole("img", { name: /Product 1/i })).not.toBeInTheDocument();
    });

    const previousButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(previousButton);
    await waitFor(() => {
      expect(screen.getByRole("img", { name: /Product 1/i })).toBeInTheDocument();
      expect(screen.getByRole("img", { name: /Product 10/i })).toBeInTheDocument();
      expect(screen.queryByRole("img", { name: /Product 11/i })).not.toBeInTheDocument();
    });
  });
});
