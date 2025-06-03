import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpClientData } from '../types';

interface RegisterType {
  isLoading: boolean;
  error: string;
  isSuccess: boolean | null;
}

const initialState: RegisterType = {
  isLoading: true,
  error: "",
  isSuccess: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    fetchRequest: (state, action: PayloadAction<SignUpClientData>) => {
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

export const RegisterSliceActions = { ...registerSlice.actions }

export default registerSlice.reducer;