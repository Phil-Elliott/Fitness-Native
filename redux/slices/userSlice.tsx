import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/types/user";

interface UserState {
  userDetails: User | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  userDetails: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
    },
    resetUserDetails: (state) => {
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, resetUserDetails } = userSlice.actions;

export default userSlice.reducer;
