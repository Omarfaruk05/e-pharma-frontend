import { getUserInfo } from "@/services/auth.service";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
}

const { id } = getUserInfo() as any;

const initialState: UserState = {
  isLoggedIn: id ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
