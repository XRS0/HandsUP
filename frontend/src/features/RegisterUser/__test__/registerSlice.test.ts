import { initialState, RegisterSliceActions } from "../models/slice";
import registerReducer from "../models/slice";
import { SignUpClientData } from "../types";

describe("Test for register slice", () => {
  test("returns initialState for unknown action", () => {
    const state = registerReducer(initialState, { type: "unknown_action" });
    expect(state).toStrictEqual(initialState);
  });

  test("fetchRequest action", () => {
    const state = registerReducer(
      initialState,
      RegisterSliceActions.fetchRequest({} as SignUpClientData)
    );

    expect(state.isLoading).toBe(true);
  });

  test("fetchSuccess action", () => {
    const state = registerReducer(
      initialState,
      RegisterSliceActions.fetchSuccess()
    );
    
    expect(state).toStrictEqual({...initialState, isLoading: false, isSuccess: true});
  });

  test("fetchFailure action", () => {
    const state = registerReducer(
      initialState,
      RegisterSliceActions.fetchFailure("Error")
    );

    expect(state).toStrictEqual({
      ...initialState, 
      isLoading: false, 
      error: "Error", 
      isSuccess: false
    });
  });
});