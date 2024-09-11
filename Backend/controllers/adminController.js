import { User } from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const { userId } = req.query;

  try {
    const currentUser = await User.findById(userId);

    if (currentUser && currentUser.isAdmin) {
      const getAllUsers = await User.find({ isDel: false, isAdmin: false });
      if (getAllUsers.length > 0) {
        return res.status(200).json({ users: getAllUsers });
      } else {
        return res.status(200).json({ msg: "No users found" });
      }
    } else {
      return res
        .status(403)
        .json({ msg: "Access denied", isAdmin: false, users: [] });
    }
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Server error" });
  }
};

export const delUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const getUser = await User.findById(userId);
    if (getUser) {
      await User.updateOne({ _id: userId }, { isDel: true });
      return res.status(201).json({
        msg: "User deleted successfully",
        success: true,
      });
    } else {
      return res.status(403).json({
        msg: "Selected User not found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: true, msg: "Server error" });
  }
};
