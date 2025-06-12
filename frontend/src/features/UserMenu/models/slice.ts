import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type appLanguage = "Русский" | "English";
export type appTheme = "Dark" | "Light" | "System";

export type SettingsState = {
  language: appLanguage;
  theme: appTheme;
}

export const initialState: SettingsState = {
  language: "Русский",
  theme: "Dark",
};

const appSettings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    switchSetting(state, action: PayloadAction<{setting: keyof SettingsState, option: appTheme | appLanguage}>) {
      const {option, setting} = action.payload;
      if (setting && option) state[setting] = option as never;
    }
  }
});

export const SettingsSliceActions = { ...appSettings.actions }

export default appSettings.reducer;