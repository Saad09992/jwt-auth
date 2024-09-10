import express from "express";
import { getUsers } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/admin/get-users", getUsers);

export default adminRouter;
