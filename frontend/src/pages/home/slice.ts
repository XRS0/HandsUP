import { createSlice } from "@reduxjs/toolkit";

export type catState = {
  cats: any[],
  isLoading: boolean;
  error: string | null,
}

const initialState: catState = {
  cats: [],
  isLoading: false,
  error: null,
}

export const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    getFetch: state => {
      state.isLoading = true;
    },
    getSuccess: (state, action) => {
      state.cats = action.payload;
      console.log(action.payload);
      state.isLoading = false;
    },
    getFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

export const { getFetch, getSuccess, getFailure} = catSlice.actions;
export default catSlice.reducer;