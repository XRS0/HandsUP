import { RootState } from "@/app/store";
import { IUser, JWT } from "../types";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Slice, containing user

export type UserState = IUser & JWT & {
  isLoading: boolean;
}

export const initialState: UserState = {
  email: "",
  username: "",
  balance: 0,
  price_plan: "Free",
  token: "",
  isLoading: true,  //couse i need to init request immediately
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserSucess: (state, action: PayloadAction<{user: IUser, token: string}>) => {
      Object.assign(state, action.payload.user);
      state.token = action.payload.token;
      state.isLoading = false;
    },
    getUserFailure(state) {
      state.isLoading = false;
    }
  }
});

export const UserSliceActions = { 
  ...userSlice.actions,
  getUser: createAction(`${userSlice.name}/getUser`),
}

export default userSlice.reducer;

export const selectToken = ((state: RootState) => state.user.token);