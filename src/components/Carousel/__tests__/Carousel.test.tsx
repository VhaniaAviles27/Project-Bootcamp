import { render, fireEvent, screen } from '@testing-library/react';
import Carousel from '../Carousel';
import Banner01 from '../../../assets/images/imageBanner01.jpeg';
import Banner02 from '../../../assets/images/imageBanner02.jpg';
import Banner03 from '../../../assets/images/imageBanner03.jpg';

describe('Carousel Component', () => {
  test('should render the first image by default', () => {
    render(<Carousel />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', Banner01);
  });

  test('should go to the next image when the next button is clicked', () => {
    render(<Carousel />);
    const nextButton = screen.getByTestId('buttonArrowRight');
    fireEvent.click(nextButton);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', Banner02);
  });

  test('should go to the previous image when the previous button is clicked', () => {
    render(<Carousel />);
    const previousButton = screen.getByTestId('buttonArrowLeft');
    fireEvent.click(previousButton);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', Banner03);
  });

});
