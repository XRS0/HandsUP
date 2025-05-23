import socketReducer from "@/entities/websocket/slice";
import userReducer from "@/features/Auth/models/slice";
import topicsReducer from "@/features/UserTopics/models/slice";
import settingsReducer from "@/features/UserMenu/models/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  socket: socketReducer,
  user: userReducer,
  topics: topicsReducer,
  settings: settingsReducer
});

export default rootReducer;