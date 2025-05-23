import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type appLanguage = "Русский" | "English";
export type appTheme = "Dark" | "Light" | "System";

type SettingsState = {
  language: appLanguage;
  theme: appTheme;
}

const initialState: SettingsState = {
  language: "Русский",
  theme: "Dark",
};

const appSettings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    switchSetting(state, action: PayloadAction<{setting: "language" | "theme", option: appTheme & appLanguage}>) {
      const {option, setting} = action.payload;
      state[setting] = option;
    }
  }
});

export const settingsSliceActions = {
  ...appSettings.actions,
};

export default appSettings.reducer;