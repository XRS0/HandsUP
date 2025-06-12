import settingsReducer, { appLanguage, appTheme, initialState, SettingsSliceActions, SettingsState } from "../models/slice";

describe("Test for menu slice", () => {
  test("returns initialState for unknown action", () => {
    const state = settingsReducer(initialState, { type: "unknown_action" });
    expect(state).toStrictEqual(initialState);
  });

  test("switchSettings action", () => {
    const state = settingsReducer(
      initialState,
      SettingsSliceActions.switchSetting({ setting: "language", option: "English"})
    );

    expect(state.language).toBe("English");
  });

  test("getUserSuccess handles empty user data correctly", () => {
    const state = settingsReducer(
      initialState,
      SettingsSliceActions.switchSetting({ setting: "" as keyof SettingsState, option: "" as appTheme | appLanguage})
    );
    
    expect(state).toStrictEqual({...initialState });
  });

  // dont tested on unknown data cause data comes from dropdown here
});