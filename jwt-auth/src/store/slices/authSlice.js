import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../methods/authMethod";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    isAdmin: false,
    error: "",
    success: false,
    msg: "",
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.error = null;
      state.msg = "User logout successfully";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("token-expiry");
      localStorage.removeItem("userId");
    },
    setUser: (state, action) => {
      state.user = action.payload;
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
        state.userId = action.payload.userId;
        state.msg = action.payload.msg;
        state.success = action.payload.success;
        state.isAdmin = action.payload.isAdmin;
        state.error = "";
        state.isAuthenticated = true;
        localStorage.setItem("token", state.token);
        localStorage.setItem("userId", state.userId);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { logout, setUser, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
