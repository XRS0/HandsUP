import { JwtPayload, RegisterRawData } from '@/features/Register/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  jwt: string;
  loading: boolean
  error: Error | null;
}

const initialState: UserState = {
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
    fetchRegisterSuccess: (state, action: PayloadAction<JwtPayload>) => {
      state.loading = false;
    },
    fetchRegisterFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const userSliceActions = { ...userSlice.actions }