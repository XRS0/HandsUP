import { initialState, LoginSliceActions } from "../models/slice";
import loginReducer from "../models/slice";
import { SignInClientData } from "../types";

describe("Test for login slice", () => {
  test("returns initialState for unknown action", () => {
    const state = loginReducer(initialState, { type: "unknown_action" });
    expect(state).toStrictEqual(initialState);
  });

  test("fetchRequest action", () => {
    const state = loginReducer(
      initialState,
      LoginSliceActions.fetchRequest({} as SignInClientData)
    );

    expect(state.isLoading).toBe(true);
  });

  test("fetchSuccess action", () => {
    const state = loginReducer(
      initialState,
      LoginSliceActions.fetchSuccess()
    );
    
    expect(state).toStrictEqual({...initialState, isLoading: false, isSuccess: true});
  });

  test("fetchFailure action", () => {
    const state = loginReducer(
      initialState,
      LoginSliceActions.fetchFailure("Error")
    );

    expect(state).toStrictEqual({
      ...initialState, 
      isLoading: false, 
      error: "Error", 
      isSuccess: false
    });
  });
});