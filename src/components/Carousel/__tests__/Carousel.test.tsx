import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import Carousel from "../Carousel";
import Banner01 from "../../../assets/images/imageBanner01.jpeg";
import Banner02 from "../../../assets/images/imageBanner02.jpg";

describe("Carousel Component", () => {
  test("renders the first image by default", () => {
    render(<Carousel />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", Banner01);
  });

  test("advances to the next image when next button is clicked", () => {
    render(<Carousel />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", Banner02);
  });

  test("returns to the previous image when previous button is clicked", () => {
    render(<Carousel />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton); 
    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", Banner02);
  });
});
