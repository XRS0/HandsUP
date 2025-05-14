import socketReducer from "@/entities/websocket/slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  socket: socketReducer,
});

export default rootReducer;