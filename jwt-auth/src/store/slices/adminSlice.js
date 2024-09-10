import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../methods/adminMethod";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    success: false,
    error: null,
    msg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.success = action.payload.success;
      state.error = false;
      state.users = action.payload.users;
      state.msg = action.payload.msg;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.error = action.payload.error;
      state.success = false;
      state.users = [];
    });
  },
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
