import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import Input from "../Input"; 
import { faUser } from "@fortawesome/free-solid-svg-icons";

describe("Input Component", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    typeData: "Nombre",
    icon: faUser,
    placeholder: "Introduce tu nombre",
    errorMessage: "Campo requerido",
    showError: false,
  };

  test("renders input field correctly", () => {
    render(<Input {...defaultProps} />);
    const labelElement = screen.getByText("Nombre");
    expect(labelElement).toBeInTheDocument();
    const inputElement = screen.getByPlaceholderText("Introduce tu nombre");
    expect(inputElement).toBeInTheDocument();
    const iconElement = screen.getByRole("img", { hidden: true });
    expect(iconElement).toBeInTheDocument();
  });

  test("calls onChange when input value changes", () => {
    render(<Input {...defaultProps} />);  
    const inputElement = screen.getByPlaceholderText("Introduce tu nombre");
    fireEvent.change(inputElement, { target: { value: "Juan" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith("Juan");
  });

  test("shows error message when showError is true", () => {
    render(<Input {...defaultProps} showError={true} />);
    const errorMessage = screen.getByText("Campo requerido");
    expect(errorMessage).toBeInTheDocument();
  });

  test("does not show error message when showError is false", () => {
    render(<Input {...defaultProps} showError={false} />);
    const errorMessage = screen.queryByText("Campo requerido");
    expect(errorMessage).not.toBeInTheDocument();
  });
});
