import { createSlice } from "@reduxjs/toolkit";

export const confirmedOrderSlice = createSlice({
  name: "confirmedOrder",
  initialState: {
    value: null
  },
  reducers: {
    setConfirmedOrder: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setConfirmedOrder } = confirmedOrderSlice.actions;

export default confirmedOrderSlice.reducer;
