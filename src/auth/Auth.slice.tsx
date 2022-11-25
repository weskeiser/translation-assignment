import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "appRedux/store";
import { User } from "global/interfaces";

export interface IAuthState {
  currentUser: User | null;
  token: string | null;
}

const initialState: IAuthState = { currentUser: null, token: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { currentUser, token } }: { payload: IAuthState }
    ) => {
      state.currentUser = currentUser;
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;
export const getCredentials = (state: RootState) => state.auth;

export default slice.reducer;
