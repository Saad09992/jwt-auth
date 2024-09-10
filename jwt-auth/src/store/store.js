import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer, // Ensure this line is uncommented
  },
});

export default store;
