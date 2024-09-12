import { createSlice } from "@reduxjs/toolkit";
import { delUser, getUsers } from "../methods/adminMethod";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    success: false,
    error: null,
    msg: "",
  },
  reducers: {
    resetMsgAndSuccessAdmin: (state) => {
      state.msg = "";
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.success = action.payload.success;
        state.error = false;
        state.msg = action.payload.msg;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload.error;
        state.success = false;
        state.users = [];
      })
      .addCase(delUser.fulfilled, (state, action) => {
        state.msg = action.payload.msg;
        state.success = action.payload.success;
      })
      .addCase(delUser.rejected, (state, action) => {
        state.msg = action.payload.msg;
        state.success = false;
      });
  },
});

export const { resetMsgAndSuccessAdmin } = adminSlice.actions;
export default adminSlice.reducer;
