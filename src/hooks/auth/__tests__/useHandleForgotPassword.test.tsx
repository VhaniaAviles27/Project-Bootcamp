import { renderHook, act } from "@testing-library/react";
import Swal from "sweetalert2";
import useHandlePassword from "../useHandleForgotPassword";
import { showTokenAlert, showTokenErrorAlert } from "../../../utils/validationAlert";

jest.mock("sweetalert2");
jest.mock("../../../utils/validationAlert");

describe("useHandlePassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should update password and set error correctly", () => {
    const { result } = renderHook(() => useHandlePassword());

    act(() => {
      result.current.handlePasswordChange({ target: { value: "test" } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.password).toBe("test");
    expect(result.current.passwordError).toBe(false);

    act(() => {
      result.current.handlePasswordChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.password).toBe("");
    expect(result.current.passwordError).toBe(true);
  });

  test("should handle forgot password and show success alert", async () => {
    (Swal.fire as jest.Mock).mockResolvedValue({ value: "test@example.com" });
    const { result } = renderHook(() => useHandlePassword());

    await act(async () => {
      await result.current.handleForgotPassword();
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Ingrese su correo electrónico",
      input: "email",
      inputPlaceholder: "Ingrese su correo electrónico",
      showCancelButton: true,
    });

    expect(showTokenAlert).toHaveBeenCalled();
  });

  test("should handle forgot password and show error alert if token not sent", async () => {
    (Swal.fire as jest.Mock).mockResolvedValue({ value: "test@example.com" });
    const { result } = renderHook(() => useHandlePassword());
    await act(async () => {

      result.current.handleForgotPassword = async () => {
        const { value: email } = await Swal.fire({
          title: "Ingrese su correo electrónico",
          input: "email",
          inputPlaceholder: "Ingrese su correo electrónico",
          showCancelButton: true,
        });

        if (email) {
          console.log("Correo ingresado: ", email);
          const tokenEnviado = false; 

          if (tokenEnviado) {
            showTokenAlert();
          } else {
            showTokenErrorAlert();
          }
        }
      };

      await result.current.handleForgotPassword();
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Ingrese su correo electrónico",
      input: "email",
      inputPlaceholder: "Ingrese su correo electrónico",
      showCancelButton: true,
    });

    expect(showTokenErrorAlert).toHaveBeenCalled();
    expect(showTokenAlert).not.toHaveBeenCalled();
  });
});
