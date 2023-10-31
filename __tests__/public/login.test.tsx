import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import Login from "../../app/(public)/login";

// Mocking the Alert.alert method from react-native
jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.Alert.alert = jest.fn();
  return rn;
});

// Mocking @clerk/clerk-expo's useSignIn function
jest.mock("@clerk/clerk-expo", () => ({
  useSignIn: jest.fn(() => ({
    signIn: jest.fn(),
    setActive: jest.fn(),
    isLoaded: true,
  })),
}));

describe("Login renders correctly", () => {
  it("renders correct elements", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    expect(getByPlaceholderText("email address")).toBeTruthy();
    expect(getByPlaceholderText("password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
    expect(getByText("Forgot password?")).toBeTruthy();
    expect(getByText("Create Account")).toBeTruthy();
  });

  it("allows input in email and password fields", () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText("email address");
    const passwordInput = getByPlaceholderText("password");

    fireEvent.changeText(emailInput, "test@email.com");
    fireEvent.changeText(passwordInput, "password");

    expect(emailInput.props.value).toBe("test@email.com");
    expect(passwordInput.props.value).toBe("password");
  });
});

describe("Login button functionality", () => {
  beforeEach(() => {
    // Reset mocks if needed
    jest.resetAllMocks();
  });
  it("successful login", async () => {
    (useSignIn as jest.Mock).mockReturnValue({
      signIn: {
        create: jest
          .fn()
          .mockResolvedValue({ createdSessionId: "mockSessionId" }),
      },
      setActive: jest.fn(),
      isLoaded: true,
    });

    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText("email address");
    const passwordInput = getByPlaceholderText("password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "testpassword");
    fireEvent.press(loginButton);

    await waitFor(() => expect(useSignIn().setActive).toBeCalled());
  });

  it("login error", async () => {
    (useSignIn as jest.Mock).mockReturnValue({
      signIn: {
        create: jest
          .fn()
          .mockRejectedValue({ errors: [{ message: "Login failed" }] }),
      },
      setActive: jest.fn(),
      isLoaded: true,
    });

    const { getByPlaceholderText, getByText } = render(<Login />);
    const emailInput = getByPlaceholderText("email address");
    const passwordInput = getByPlaceholderText("password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "testpassword");
    fireEvent.press(loginButton);

    await waitFor(() => expect(Alert.alert).toBeCalledWith("Login failed"));
  });
});
