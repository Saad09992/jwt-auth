import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  getUserData,
  verifyToken,
  getResetPasswordMail,
  resetPassword,
} from "../methods/authMethod";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userData: [],
    error: "",
    success: false,
    msg: "",
    emailVerificationToken: localStorage.getItem("verification-token") || null,
    resetPasswordToken: localStorage.getItem("reset-password-token") || null,
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
    resetMsgAndSuccess: (state) => {
      state.msg = "";
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.msg = action.payload.msg;
        state.success = action.payload.success;
        state.emailVerificationToken = action.payload.emailVerificationToken;
        state.error = "";
        localStorage.setItem(
          "verification-token",
          action.payload.emailVerificationToken
        );
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.msg;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.msg = action.payload.msg;
        state.success = action.payload.success;
        state.userData = action.payload.userData;
        state.error = action.payload.error;
        state.isAuthenticated = action.payload.isAuthenticated;
        if (action.payload.token != null) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.msg;
        state.success = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.msg = action.payload.msg;
        state.userData = action.payload.userData;
        state.success = action.payload.success;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.error.msg;
        state.success = false;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.msg = action.payload.msg;
        state.error = "";
        localStorage.removeItem("verification-token");
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.msg;
      })
      .addCase(getResetPasswordMail.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.msg = action.payload.msg;
        state.error = "";
        state.resetPasswordToken = action.payload.resetPasswordToken;
        localStorage.setItem(
          "reset-password-token",
          action.payload.resetPasswordToken
        );
      })
      .addCase(getResetPasswordMail.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.msg;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.msg = action.payload.msg;
        state.error = "";
        localStorage.removeItem("reset-password-token");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.msg;
      });
  },
});

export const { logout, setUser, setAuthenticated, resetMsgAndSuccess } =
  authSlice.actions;
export default authSlice.reducer;
