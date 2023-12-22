import { configureStore } from "@reduxjs/toolkit";
import { reviloSlice } from "./slice";

export const Store = configureStore({
  reducer: reviloSlice.reducer,
});

export type RootState = ReturnType<typeof Store.getState>