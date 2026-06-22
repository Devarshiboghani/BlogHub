import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "../actions/blogAction";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    isCreate: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isError = false;
      state.isCreate = false;
    },
  },

  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });

    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isCreate = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isCreate = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
