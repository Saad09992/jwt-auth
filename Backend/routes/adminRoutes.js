import express from "express";
import { delUser, getUsers } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/admin/get-users", getUsers);
adminRouter.post("/admin/del-user", delUser);

export default adminRouter;
