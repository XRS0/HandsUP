import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignInClientData } from '../types';

interface loginType {
  isLoading: boolean;
  error: string;
  isSuccess: boolean | null;
}

const initialState: loginType = {
  isLoading: false,
  error: "",
  isSuccess: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    fetchRequest: (state, action: PayloadAction<SignInClientData>) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = "";
      state.isSuccess = true;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isSuccess = false;
    },
  }
});

export const LoginSliceActions = { ...loginSlice.actions }

export default loginSlice.reducer;