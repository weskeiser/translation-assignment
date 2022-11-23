import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "appRedux/store";
import { User } from "global/interfaces";

interface IAuthState {
  user: User | null;
  token: string | null;
}

const initialState: IAuthState = { user: null, token: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;
export default slice.reducer;
export const selectAuthenticated = (state: RootState) => state.auth;
