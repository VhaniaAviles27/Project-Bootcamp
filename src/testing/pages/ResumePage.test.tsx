import { render, screen, fireEvent } from "@testing-library/react";
import ResumePage from "../../pages/ResumePage";
import { useCartContext } from "../../hooks/cartContext";
import { useValidation } from "../../hooks/useValidation";
import { useHandlePay } from "../../hooks/useHandlePay";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../hooks/cartContext");
jest.mock("../../hooks/useValidation");
jest.mock("../../hooks/useHandlePay");

describe("ResumePage Component", () => {
  beforeEach(() => {
    (useCartContext as jest.Mock).mockReturnValue({
      state: {
        cart: [
          {
            id: 1,
            title: "Product 1",
            price: 100,
            thumbnail: "img1.jpg",
            quantity: 2,
          },
          {
            id: 2,
            title: "Product 2",
            price: 200,
            thumbnail: "img2.jpg",
            quantity: 1,
          },
        ],
      },
      dispatch: jest.fn(),
    });

    (useValidation as jest.Mock).mockReturnValue({
      name: "John",
      handleNameChange: jest.fn(),
      lastName: "Doe",
      handleLastNameChange: jest.fn(),
      district: "District 1",
      handleDistrictChange: jest.fn(),
      address: "123 Main St",
      handleAddressChange: jest.fn(),
      reference: "Near Park",
      handleReferenceChange: jest.fn(),
      phone: "987654321",
      handlePhoneChange: jest.fn(),
      error: {
        name: false,
        lastName: false,
        district: false,
        address: false,
        reference: false,
        phone: false,
      },
    });

    (useHandlePay as jest.Mock).mockReturnValue({
      handlePay: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render ResumePage with cart products and customer information form", () => {
    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("$ 100")).toBeInTheDocument();
    expect(screen.getByText("$ 200")).toBeInTheDocument();
    expect(screen.getByText("Total a Pagar = $400.00")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Ingresa tu nombre")).toHaveValue(
      "John"
    );
    expect(screen.getByPlaceholderText("Ingresa tu apellido")).toHaveValue(
      "Doe"
    );
    expect(screen.getByPlaceholderText("Ingresa tu dirección")).toHaveValue(
      "123 Main St"
    );
    expect(
      screen.getByPlaceholderText("Ingresa un número de celular")
    ).toHaveValue("987654321");
  });

  test('should increment product quantity when "+" button is clicked', () => {
    const { dispatch } = useCartContext() as any;

    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>
    );

    const incrementButton = screen.getAllByTestId("incrementQuantity")[0];
    fireEvent.click(incrementButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: "INCREMENT_QUANTITY",
      productId: 1,
    });
  });

  test('should decrement product quantity when "-" button is clicked', () => {
    const { dispatch } = useCartContext() as any;

    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>
    );

    const decrementButton = screen.getAllByTestId("decrementQuantity")[0];
    fireEvent.click(decrementButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: "DECREMENT_QUANTITY",
      productId: 1,
    });
  });

  test('should call handlePay when "Pagar" button is clicked', () => {
    const { handlePay } = useHandlePay() as any;

    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>
    );

    const payButton = screen.getByText("Pagar");
    fireEvent.click(payButton);

    expect(handlePay).toHaveBeenCalledWith(
      {
        name: "John",
        lastName: "Doe",
        district: "District 1",
        address: "123 Main St",
        reference: "Near Park",
        phone: "987654321",
      },
      {
        name: false,
        lastName: false,
        district: false,
        address: false,
        reference: false,
        phone: false,
      }
    );
  });

  test("should call handleClearProduct when delete button is clicked", () => {
    const { dispatch } = useCartContext() as any;

    render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>
    );

    const deleteButton = screen.getAllByTestId("clearProduct")[0];
    fireEvent.click(deleteButton);

    expect(dispatch).toHaveBeenCalledWith({
      type: "CLEAR_PRODUCT",
      productId: 1,
    });
  });
});
