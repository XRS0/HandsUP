import { mockRootState } from "@/shared/utils/test.utils";
import wsReducer, { initialState, selectMessage, SocketSliceActions } from "../models/slice";

describe("Test for login slice", () => {
  test("returns initialState for unknown action", () => {
    const state = wsReducer(initialState, { type: "unknown_action" });
    expect(state).toStrictEqual(initialState);
  });

  test("addMessage action", () => { 
    const state = wsReducer(
      initialState,
      SocketSliceActions.addMessage("Hello Word!")
    );

    expect(state.message).toBe("Hello Word!");
  });

  test("allowEdit action", () => { 
    const state = wsReducer(
      initialState,
      SocketSliceActions.allowEdit()
    );

    expect(state.isEditingNow).toBe(true);  // init value is false
  });

  test("editMessage action", () => { 
    const state = wsReducer(
      initialState,
      SocketSliceActions.editMessage("Hello Word!")
    );

    expect(state.newMessage).toBe("Hello Word!");
  });

  test("cancelMessage action", () => {
    const state = wsReducer(
      initialState,
      SocketSliceActions.cancelMessage()
    );

    expect(state.newMessage).toBe("");
    expect(state.isEditingNow).toBe(false);
  });

  test("setMessage action", () => { 
    let state = wsReducer(
      initialState,
      SocketSliceActions.editMessage("Hello Word!")
    );

    state = wsReducer(
      state,
      SocketSliceActions.setMessage()
    );

    expect(state.newMessage).toBe("");
    expect(state.message).toBe("Hello Word!");
  });

  test("handleOpen action", () => { 
    const state = wsReducer(
      initialState,
      SocketSliceActions.handleOpen()
    );

    expect(state.message).toBe("");
    expect(state.isRecording).toBe(true);
  });

  test("handlePause action", () => { 
    const state = wsReducer(
      initialState,
      SocketSliceActions.handlePause()
    );

    expect(state.isRecording).toBe(false);
  });

  test("handleMessage action has correct type", () => {
    expect(SocketSliceActions.handleMessage.type).toBe("ws/handleMessage");
  });

  test("selectToken selector returns correct value", () => {
    const state = mockRootState({ socket: { ...initialState, message: "Bubbles" } });
    expect(selectMessage(state)).toBe("Bubbles");
  });
});