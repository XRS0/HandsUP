import { TopicPreview } from '@/features/UserTopics/types/topic';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types/user';
import { SignInResponseData, SignUpResponseData } from '../types/auth';
import { RootState } from '@/app/Store/store';

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
    addTopic(state, action: PayloadAction<TopicPreview>) {
      state.user!.topics.push(action.payload);
    },
  }
});

export const AuthSliceActions = { 
  ...userSlice.actions,
  getUser: createAction(`${userSlice.name}/getUser`),
}

export default userSlice.reducer;