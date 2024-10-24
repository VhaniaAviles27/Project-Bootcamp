import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Title from '../Title';

describe('Title Component', () => {
  test('renders the title text', () => {
    render(<Title title="Test Title" />);
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
    const separatorElement = screen.getByRole('separator');
    expect(separatorElement).toBeInTheDocument();
  });
});
