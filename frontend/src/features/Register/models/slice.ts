import { JwtPayloadWithToken, RegisterResponseData } from '@/features/types';
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
    fetchRegisterRequest: (state, action: PayloadAction<RegisterResponseData>) => {
      state.loading = true;
    },
    fetchRegisterSuccess: (state, action: PayloadAction<JwtPayloadWithToken>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.jwt = action.payload.jwt;
      state.uid = action.payload.sub;

      state.loading = false;
    },
    fetchRegisterFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

export const RegisterActions = { ...userSlice.actions }
export default userSlice.reducer;