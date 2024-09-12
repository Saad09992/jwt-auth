import backend from "../../api/backend";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk("/signup", async (data) => {
  try {
    const response = await backend.post("/signup", data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
});

export const loginUser = createAsyncThunk("/login", async (data) => {
  try {
    const response = await backend.post("/login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getUserData = createAsyncThunk("/get-user-data", async (token) => {
  try {
    const response = await backend.get("/get-user-data", {
      params: { token },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const verifyToken = createAsyncThunk("/verify/:token", async (token) => {
  try {
    const response = await backend.get(`/verify/${token}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getResetPasswordMail = createAsyncThunk(
  "/get-reset-password-mail/",
  async (email) => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-expiry");
    try {
      const response = await backend.post("/get-reset-password-mail/", {
        email,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/reset-password",
  async (data) => {
    console.log(data);
    try {
      const response = await backend.post("/reset-password", data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
