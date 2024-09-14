import express from "express";
import {
  delUser,
  getUsers,
  setUserRole,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/admin/get-users", getUsers);
adminRouter.post("/admin/del-user", delUser);
adminRouter.post("/admin/set-user-admin", setUserRole);

export default adminRouter;
