import { combineReducers } from "redux";
import { userReducer } from "@/features/AuthUser";
import { loginReducer } from "@/features/LoginUser";
import { topicsReducer } from "@/features/UserTopics";
import socketReducer from "@/entities/websocket/models/slice";
import { registerReducer } from "@/features/RegisterUser";
import settingsReducer from "@/features/UserMenu/models/slice";
import { chatReducer } from "@/features/UserChat";

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  login: loginReducer,
  socket: socketReducer,
  topics: topicsReducer,
  register: registerReducer,
  settings: settingsReducer,
});

export default rootReducer;