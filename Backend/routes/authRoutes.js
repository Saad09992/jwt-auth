import express from "express";
import { login, signUp, getUserData } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/api/signup", signUp);
authRouter.post("/api/login", login);
authRouter.get("/api/get-user-data", getUserData);

export default authRouter;
