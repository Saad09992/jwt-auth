import backend from "../../api/backend";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk("/signup", async (data) => {
  try {
    const response = await backend.post("/signup", data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data; // Return error response
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
