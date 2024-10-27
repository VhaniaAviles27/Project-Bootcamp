import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import Card from "../Card"; 

describe("Card Component", () => {
  const defaultProps = {
    imageSrc: "image.jpg", 
    name: "Producto de Prueba",
    stock: 5,
    price: 100,
    width: 300,
    height: 400,
    onAddProductToCart: jest.fn(), 
  };

  test("renders card with correct details", () => {
    render(<Card {...defaultProps} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "image.jpg");
    const nameElement = screen.getByText("Producto de Prueba");
    expect(nameElement).toBeInTheDocument();
    const stockElement = screen.getByText("Stock: 5");
    expect(stockElement).toBeInTheDocument();
    const priceElement = screen.getByText("Price: $100");
    expect(priceElement).toBeInTheDocument();
  });

  test("calls onAddProductToCart when Add to cart button is clicked", () => {
    render(<Card {...defaultProps} />);
    const addButton = screen.getByText("Add to cart");
    fireEvent.click(addButton);
    expect(defaultProps.onAddProductToCart).toHaveBeenCalledTimes(1);
  });
});
