import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ComboBox from "../ComboBox"; 
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

describe("ComboBox Component", () => {
  const defaultProps = {
    options: [
      { value: "option1", label: "Opción 1" },
      { value: "option2", label: "Opción 2" },
    ],
    onSelect: jest.fn(),
    selectedValue: "",
    typeData: "Selecciona una opción",
    errorMessage: "Campo requerido",
    showError: false,
    icon: faChevronDown,
  };

  test("renders without crashing", () => {
    render(<ComboBox {...defaultProps} />);
    const labelElement = screen.getByText("Selecciona una opción");
    expect(labelElement).toBeInTheDocument();
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();  
    const iconElement = screen.getByRole("img", { hidden: true }); 
    expect(iconElement).toBeInTheDocument();
  });

  test("calls onSelect when an option is selected", () => {
    render(<ComboBox {...defaultProps} selectedValue="option1" />); 
    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "option2" } }); 
    expect(defaultProps.onSelect).toHaveBeenCalledWith("option2");
  });

  test("displays error message when showError is true", () => {
    render(<ComboBox {...defaultProps} showError={true} />);
    const errorMessage = screen.getByText("Campo requerido");
    expect(errorMessage).toBeInTheDocument();
  });

  test("does not display error message when showError is false", () => {
    render(<ComboBox {...defaultProps} showError={false} />);
    const errorMessage = screen.queryByText("Campo requerido");
    expect(errorMessage).not.toBeInTheDocument();
  });
});
