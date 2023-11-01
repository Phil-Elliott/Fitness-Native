import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
