import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "../Icon"; 
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

describe("Icon Component", () => {
  const defaultProps = {
    icon: faCoffee,
    onNavigate: jest.fn(),
  };

  test("renders without crashing", () => {
    render(<Icon {...defaultProps} />);
    const iconElement = screen.getByRole("img", { hidden: true });
    expect(iconElement).toBeInTheDocument();
  });

  test("calls onNavigate when clicked", () => {
    render(<Icon {...defaultProps} />);
    const iconElement = screen.getByRole("img", { hidden: true });
    fireEvent.click(iconElement);
    expect(defaultProps.onNavigate).toHaveBeenCalled();
  });
});
