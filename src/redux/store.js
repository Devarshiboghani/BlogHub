import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/blogSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    blogStore: blogSlice,
    authStore: authSlice,
  },
});
