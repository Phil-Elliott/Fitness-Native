import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface UserSettings {
  theme: Theme;
}

interface SettingsState {
  userSettings: UserSettings | null;
  status: "idle" | "loading" | "failed";
}

const initialState: SettingsState = {
  userSettings: null,
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
      if (state.userSettings) {
        state.userSettings.theme = action.payload;
      }
    },
  },
});

export const { setUserSettings, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
