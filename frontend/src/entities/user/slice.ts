import { JwtPayload, JwtPayloadWithToken, RegisterRawData } from '@/features/Register/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  uid: string;
  name: string;
  email: string;
  jwt: string;
  loading: boolean
  error: Error | null;
}

const initialState: UserState = {
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
    fetchRegisterRequest: (state, action: PayloadAction<RegisterRawData>) => {
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
  },
});

export const userSliceActions = { ...userSlice.actions }
export default userSlice.reducer;