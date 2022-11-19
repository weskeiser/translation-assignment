import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import aslHistoryReducer from "features/ASLHistory/aslHistory.redux";

export const store = configureStore({
  reducer: {
    aslHistory: aslHistoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
