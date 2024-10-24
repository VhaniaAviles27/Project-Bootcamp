import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FooterLayout from "../FooterLayout";

jest.mock("../../../components/Icon/Icon", () => ({
  __esModule: true,
  default: ({ icon }: { icon: any }) => <div data-testid={`icon-${icon.iconName}`} />,
}));

describe("FooterLayout Component", () => {
  test("renders copyright text", () => {
    render(<FooterLayout />);
    const copyrightElement = screen.getByText(
      "Copyrigth | All rights reserved Mrs. Moon Design Company"
    );
    expect(copyrightElement).toBeInTheDocument();
  });

  test("renders all social media icons", () => {
    render(<FooterLayout />);
    const facebookIcon = screen.getByTestId("icon-facebook");
    const instagramIcon = screen.getByTestId("icon-instagram");
    const tiktokIcon = screen.getByTestId("icon-tiktok");
    expect(facebookIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(tiktokIcon).toBeInTheDocument();
  });
});
