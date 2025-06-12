import { mockRootState } from "@/shared/utils/test.utils";
import { initialState, selectToken, UserSliceActions } from "../models/slice";
import userReducer from "../models/slice";
import { IUser } from "../types";

describe("Test for login slice", () => {
  test("returns initialState for unknown action", () => {
    const state = userReducer(initialState, { type: "unknown_action" });
    expect(state).toStrictEqual(initialState);
  });

  test("getUserSuccess action", () => {
    const testUser: {user: IUser, token: string} = {
      token: "Hello Word!",
      user: {
        balance: 3,
        email: "serg33500@mail.ru",
        price_plan: "VIP",
        username: "sega_venom"
      }
    }

    const state = userReducer(
      initialState,
      UserSliceActions.getUserSucess(testUser)
    );

    expect(state).toStrictEqual({...testUser.user, token: testUser.token, isLoading: false});
  });

  test("getUserSuccess handles empty user data correctly", () => {
    const state = userReducer(
      initialState,
      UserSliceActions.getUserSucess({ user: {} as IUser, token: "" })
    );
    
    expect(state).toStrictEqual({...initialState, isLoading: false});
  });

  test("getUserFailure action", () => {
    const state = userReducer(
      initialState,
      UserSliceActions.getUserFailure()
    );

    expect(state.isLoading).toStrictEqual(false);
  });

  test("getUser action has correct type", () => {
    expect(UserSliceActions.getUser.type).toBe("user/getUser");
  });

  test("selectToken selector returns correct value", () => {
    const state = mockRootState({ user: { ...initialState, token: "test-token" } });
    expect(selectToken(state)).toBe("test-token");
  });
});