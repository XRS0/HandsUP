import { SignInResponseData, SignUpResponseData } from '@/features/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/types';

interface UserSlice {
  user: IUser | null;
  token: string | null;    //для удобства
  loading: boolean;
  error: string | null;
  isSignSuccess: boolean;
}

const initialState: UserSlice = {
  user: null,
  token: localStorage.getItem("access_token"),
  loading: false,
  error: null,
  isSignSuccess: false,
};

export const userSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    fetchSignInRequest: (state, action: PayloadAction<SignInResponseData>) => {
      state.loading = true;
    },
    fetchSignInSuccess: (state, action: PayloadAction<{user: IUser, token: string}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.isSignSuccess = true;
    },
    fetchSignInFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isSignSuccess = false;
      state.loading = false;
    },
    fetchSignUpRequest: (state, action: PayloadAction<SignUpResponseData>) => {
      state.loading = true;
    },
    fetchSignUpSuccess: (state, action: PayloadAction<{user: IUser, token: string}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.isSignSuccess = true;
    },
    fetchSignUpFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isSignSuccess = false;
      state.loading = false;
    },
    signOut(state) {
      state.user = null;
      state.token = null;
    },
  }
});

export const AuthSlice = { ...userSlice.actions }
export default userSlice.reducer;