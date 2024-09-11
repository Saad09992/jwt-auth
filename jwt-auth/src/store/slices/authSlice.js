import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUserData } from "../methods/authMethod";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userData: [],
    error: "",
    success: false,
    msg: "",
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.userData = [];
      state.msg = "User logout successfully";
      state.isAuthenticated = false;
      state.success = false;
      localStorage.removeItem("token");
      localStorage.removeItem("token-expiry");
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.msg = action.payload.msg;
        state.success = action.payload.success;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.msg = action.payload.msg;
        state.success = action.payload.success;
        state.userData = action.payload.userData;
        state.error = "";
        state.isAuthenticated = true;
        localStorage.setItem("token", state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.error;
        state.success = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.msg = action.payload.msg;
        state.userData = action.payload.userData;
        state.success = action.payload.success;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.payload.error;
        state.msg = action.payload.msg;
        state.success = false;
      });
  },
});

export const { logout, setUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
