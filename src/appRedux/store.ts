import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { translationsApi } from "api/translationApi";
import aslHistoryReducer from "features/ASLHistory/aslHistory.redux";
import authReducer from "auth/Auth.slice";

export const store = configureStore({
  reducer: {
    [translationsApi.reducerPath]: translationsApi.reducer,
    auth: authReducer,
    aslHistory: aslHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(translationsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
