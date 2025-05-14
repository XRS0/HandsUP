import socketReducer from "@/entities/websocket/slice";
import userReducer from "@/entities/user/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  socket: socketReducer,
  user: userReducer
});

export default rootReducer;