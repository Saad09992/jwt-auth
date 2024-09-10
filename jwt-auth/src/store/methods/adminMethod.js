import adminBackend from "../../api/adminBackend";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("/get-users", async (userId) => {
  try {
    const response = await adminBackend.get(`/get-users`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
