import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';
import '@testing-library/jest-dom/extend';

describe('Button Component', () => {
  test('should render button with correct text', () => {
    render(<Button textButton="Click Me" testId="button" />);

    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  test('should call onAction when button is clicked', () => {
    const mockOnAction = jest.fn();
    render(<Button textButton="Click Me" testId="button" onAction={mockOnAction} />);

    const buttonElement = screen.getByTestId('button');
    fireEvent.click(buttonElement);

    expect(mockOnAction).toHaveBeenCalled();
  });

  test('should render additional text', () => {
    render(<Button textButton="Click Me" aditionalText="Additional Text" testId="button" />);

    const additionalTextElement = screen.getByText('Additional Text');
    expect(additionalTextElement).toBeInTheDocument();
  });
});
