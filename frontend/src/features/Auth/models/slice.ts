import { IUser, JWT, SignInResponseData, SignUpResponseData } from '@/features/Auth/types/types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSlice {
  user: IUser | null;
  acess_token: string | null;    //для удобства
  loading: boolean;
  error: string | null;
  isSignSuccess: boolean;
}

const initialState: UserSlice = {
  user: null,
  acess_token: localStorage.getItem("access_token"),
  loading: false,
  error: null,
  isSignSuccess: false,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchSignInRequest: (state, action: PayloadAction<SignInResponseData>) => {
      state.loading = true;
    },
    fetchSignUpRequest: (state, action: PayloadAction<SignUpResponseData>) => {
      state.loading = true;
    },
    getUserSucess: (state, action: PayloadAction<string>) => {
      state.acess_token = action.payload;
    },
    fetchSuccess: (state, action: PayloadAction<IUser & JWT>) => {
      const {access_token, ...user} = action.payload

      state.user = user;
      state.acess_token = access_token;
      state.loading = false;
      state.isSignSuccess = true;
    },
    fetchAuthFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isSignSuccess = false;
      state.loading = false;
    },
    signOut: (state) => {
      state.user = null;
      state.acess_token = null;
    },
  }
});

export const AuthSlice = { 
  ...userSlice.actions,
  getUser: createAction(`${userSlice.name}/getUser`),
  getRefreshToken: createAction(`${userSlice.name}/getRefreshToken`),
}
export default userSlice.reducer;