import socketReducer from "@/entities/websocket/slice";
import userReducer from "@/features/Register/models/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  socket: socketReducer,
  user: userReducer
});

export default rootReducer;