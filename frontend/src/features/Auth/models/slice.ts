import { IUser, JWT, SignInResponseData, SignUpResponseData, topicPreview } from '@/features/Auth/types/types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSlice {
  user: IUser;
  acess_token: string | null;    //для удобства
  loading: boolean;
  error: string | null;
  isSignSuccess: boolean;
}

const initialState: UserSlice = {
  user: {
    username: "YXUNGGG",
    email: "s.krivostanenko@mail.com",
    password: "Viperr",
    balance: 31,
    price_plan: "Free",
    topics: [
      {
        name: "Rome Lecture",
        time: Date.now() - 86400100
      },
      {
        name: ("Sumarinian Asterix and Obelix"),
        time: Date.now() - 86400100 * 3
      }, {
        name: "Britan English Lesson",
        time: Date.now() - 86400100 * 3
      }
    ]
  },
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
    addTopic(state, action: PayloadAction<topicPreview>) {
      state.user.topics.push(action.payload);
    },
  }
});

export const AuthSliceActions = { 
  ...userSlice.actions,
  getUser: createAction(`${userSlice.name}/getUser`),
  getRefreshToken: createAction(`${userSlice.name}/getRefreshToken`),
}
export default userSlice.reducer;