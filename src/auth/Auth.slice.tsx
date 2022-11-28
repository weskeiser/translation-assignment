import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "appRedux/store";

export interface IAuthState {
  userId: number | null;
  username: string | null;
  token: string | null;
}

const initialState: IAuthState = { userId: null, username: null, token: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { userId, token, username } }: { payload: IAuthState }
    ) => {
      state.userId = userId;
      state.token = token;
      state.username = username;
    },
  },
});

export const { setCredentials } = slice.actions;
export const getCredentials = (state: RootState) => state.auth;

export default slice.reducer;
