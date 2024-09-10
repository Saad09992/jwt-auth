import express from "express";
import { login, signUp } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/api/signup", signUp);
authRouter.post("/api/login", login);

export default authRouter;
