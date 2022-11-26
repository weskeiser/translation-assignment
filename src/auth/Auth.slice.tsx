import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "appRedux/store";

export interface IAuthState {
  userId: number | null;
  token: string | null;
}

const initialState: IAuthState = { userId: null, token: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { userId, token } }: { payload: IAuthState }
    ) => {
      state.userId = userId;
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;
export const getCredentials = (state: RootState) => state.auth;

export default slice.reducer;
