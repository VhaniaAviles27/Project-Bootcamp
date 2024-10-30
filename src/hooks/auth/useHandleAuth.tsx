import { USER_URL } from "../../utils/apiEndpoints";
import {
  showFieldsRequiredAlert,
  showLoginSuccessAlert,
  showInvalidUsernameAlert,
  showInvalidPasswordAlert,
  showNetworkErrorAlert,
} from "../../utils/validationAlert";

export const useHandleAuth = () => {
  const handleAuth = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    if (username === "" || password === "") {
      showFieldsRequiredAlert();
      return false;
    }
    const login = async (username: string, password: string): Promise<any> => {
      const response = await fetch(USER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    };
    try {
      const data = await login(username, password);
      if (!data.accessToken) {
        if (data.error === "invalid_username") {
          showInvalidUsernameAlert();
        } else if (data.error === "invalid_password") {
          showInvalidPasswordAlert();
        }
        return false;
      }
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      showLoginSuccessAlert();
      return true;
    } catch (error) {
      showNetworkErrorAlert();
      console.error("Error:", error);
      return false;
    }
  };
  return { handleAuth };
};
