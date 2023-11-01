import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface UserSettings {
  theme: Theme;
}

interface SettingsState {
  userSettings: UserSettings;
  status: "idle" | "loading" | "failed";
}

const initialState: SettingsState = {
  userSettings: {
    theme: "light",
  },
  status: "idle",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserSettings: (state, action: PayloadAction<UserSettings>) => {
      state.userSettings = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.userSettings.theme = action.payload;
    },
  },
});

export const { setUserSettings, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
