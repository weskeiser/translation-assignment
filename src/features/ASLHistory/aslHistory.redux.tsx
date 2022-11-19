import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { makeNewHistory } from "./aslHistory.helpers";
import { addToHistoryAPI, fetchHistoryAPI } from "api";

// Adapter / initial state
const aslHistoryAdapter = createEntityAdapter({
  selectId: () => "history",
});
const initialState = aslHistoryAdapter.getInitialState<{ status: string }>({
  status: "idle",
});

// API: Fetch history
export const fetchHistory = createAsyncThunk(
  "aslHistory/fetchHistory",
  async () => {
    const [user] = await fetchHistoryAPI();
    console.log(user.translations);
    return user.translations;
  }
);

// API: Add to history
export const addToHistory = createAsyncThunk(
  "aslHistory/addToHistory",
  async (addition: string) => {
    const [user] = await fetchHistoryAPI();

    const newHistory = makeNewHistory(user, addition);

    const { translations } = await addToHistoryAPI(newHistory);

    return translations;
  }
);

// Reducer
export const aslHistorySlice = createSlice({
  name: "aslHistory",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Get
      .addCase(fetchHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        console.log(action);
        aslHistoryAdapter.setOne(state, action.payload);
        state.status = "idle";
      })
      .addCase(fetchHistory.rejected, (state) => {
        state.status = "failed";
      })

      // Update
      .addCase(addToHistory.fulfilled, (state, action) => {
        aslHistoryAdapter.setOne(state, action.payload);
      });
  },
});

export default aslHistorySlice.reducer;

// Selectors
export const { selectAll: selectHistory } = aslHistoryAdapter.getSelectors(
  (state: any) => {
    console.log(state.aslHistory.entities);
    return state.aslHistory;
  }
);
