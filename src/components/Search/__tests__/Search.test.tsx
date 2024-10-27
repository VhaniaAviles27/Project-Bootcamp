import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "../Search";

describe("Search Component", () => {
  test("renders search input and icon", () => {
    render(<Search onSearch={jest.fn()} />);
    const iconElement = screen.getByRole("img", { hidden: true });
    expect(iconElement).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText("Buscar productos...");
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onSearch when input value changes", () => {
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);
    const inputElement = screen.getByPlaceholderText("Buscar productos...");
    fireEvent.change(inputElement, { target: { value: "Nuevo producto" } });
    expect(onSearchMock).toHaveBeenCalledWith("Nuevo producto");
  });
});
