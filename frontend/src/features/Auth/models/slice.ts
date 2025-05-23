import { IUser, SignInResponseData, SignUpResponseData, topicPreview } from '@/features/Auth/types/types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

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

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchSignInRequest: (state, action: PayloadAction<SignInResponseData>) => {
      state.loading = true;
    },
    fetchSignUpRequest: (state, action: PayloadAction<SignUpResponseData>) => {
      state.loading = true;
    },
    getUserSucess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchSuccess: (state, action: PayloadAction<string>) => {
      state.acess_token = action.payload;
      state.loading = false;
      state.isSignSuccess = true;
      state.error = null;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isSignSuccess = false;
      state.loading = false;
    },
    addTopic(state, action: PayloadAction<topicPreview>) {
      state.user!.topics.push(action.payload);
    },
  }
});

export const AuthSliceActions = { 
  ...userSlice.actions,
  getUser: createAction(`${userSlice.name}/getUser`),
  getRefreshToken: createAction(`${userSlice.name}/getRefreshToken`),
}
export default userSlice.reducer;