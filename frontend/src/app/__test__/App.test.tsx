import { screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../App";
import { implementReduxMock, renderWithProviders } from "@/shared/utils/test.utils";

jest.mock('@/hooks/redux', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn(),
}));

jest.mock('pages/WelcomePage');
jest.mock('pages/MainPage', () => ({
  __esModule: true,
  default: () => <div data-testid="main-page">Mock MainPage</div>,
}));
jest.mock('pages/AuthPage');

jest.mock('@/views/Button/ui/Button', () => ({
  __esModule: true,
  default: () => <button>Mock Button</button>
}));

describe("App", () => {
  it("renders welcome page on default route", () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId("welcome-page")).toBeInTheDocument();
  });

  it("renders auth page on /auth route", () => {
    implementReduxMock();
    renderWithProviders(<App />, { route: "/auth" });
    expect(screen.getByTestId("auth-page")).toBeInTheDocument();
  });

  it("renders main page on /chat route", () => {
    implementReduxMock();
    renderWithProviders(<App />, { route: "/chat" });
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
  });

  it("redirect to / on unknown route", () => {
    renderWithProviders(<App />, { route: "/unkown" });
    expect(screen.getByTestId("welcome-page")).toBeInTheDocument();
  });
});

