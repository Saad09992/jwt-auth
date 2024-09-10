import { User } from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const { userId } = req.query;

  try {
    console.log(userId);
    const currentUser = await User.findById(userId);

    if (currentUser && currentUser.isAdmin) {
      const getAllUsers = await User.find();
      if (getAllUsers.length > 0) {
        return res.status(200).json({ users: getAllUsers, isAdmin: true });
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
