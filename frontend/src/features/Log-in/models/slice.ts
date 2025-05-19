import { JwtPayloadWithToken, LoginResponseData, RegisterResponseData } from '@/features/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRawData } from '../../../entities/user/types';

const initialState: UserRawData = {
  uid: "",
  name: "",
  email: "",
  jwt: "",
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    fetchLoginRequest: (state, action: PayloadAction<LoginResponseData>) => {
      state.loading = true;
    },
    fetchLoginSuccess: (state, action: PayloadAction<JwtPayloadWithToken>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.jwt = action.payload.jwt;
      state.uid = action.payload.sub;

      state.loading = false;
    },
    fetchLoginFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const LoginActions = { ...userSlice.actions }
export default userSlice.reducer;