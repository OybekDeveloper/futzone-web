import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  leagueData: [],
  authError: "",
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    selectLeagueData: (state, action) => {
      state.leagueData = action.payload;
    },
    authErrorSlice: (state, action) => {
      return {
        ...state,
        authError: action.payload,
      };
    },
  },
});

export const { selectLeagueData, authErrorSlice } = eventSlice.actions;
export default eventSlice.reducer;
