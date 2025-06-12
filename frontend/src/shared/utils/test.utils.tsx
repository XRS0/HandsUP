import { RootState, store } from "@/app/store";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { UserState } from "@/features/AuthUser/models/slice";
import { ChatState } from "@/features/UserChat/models/slice";
import { loginState } from "@/features/LoginUser/models/slice";
import { RegisterState } from "@/features/RegisterUser/models/slice";
import { TopicsState } from "@/features/UserTopics/models/slice";
import { WebSocketState } from "@/entities/websocket/models/slice";
import { SettingsState } from "@/features/UserMenu/models/slice";

export const mockRootState = (overrides?: Partial<RootState>): RootState => ({
  user: {} as UserState,
  chat: {} as ChatState,
  login: {} as loginState,
  socket: {} as WebSocketState,
  topics: {} as TopicsState,
  register: {} as RegisterState,
  settings: {} as SettingsState,
  ...overrides
});

export const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

export const implementReduxMock = () => {
  (useAppSelector as jest.Mock).mockImplementation((selector) => {
      return selector({
        user: {
          token: 'test-token',
          isLoading: false,
        },
        topics: {
          currentTopic: null,
          topics: [], // если Topics использует topics.length
          isTopicCreating: false,
        },
        chat: {
          cachedChats: [] // ← добавляем то, что используется в Topics
        },
        socket: {
          isRecorded: false
        },
        login: {
          error: "",
          isSuccess: false       
        }
      });
    });
}