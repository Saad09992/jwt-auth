import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      throw new Error("All field are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(409)
        .json({ msg: "User already exists", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const addUser = new User({
      email,
      password: hashPassword,
      username,
    });

    await addUser.save();

    res.status(201).json({
      msg: "User created sucessfully",
      success: true,
    });
  } catch (error) {
    console.log("error");
    return res.status(400).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(400).json({ msg: "User not found", success: false });
  }

  const isMatch = await bcrypt.compare(password, checkUser.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials", success: false });
  }

  if (isMatch) {
    const token = jwt.sign(
      {
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.SECRET
    );
    await User.updateOne({ _id: checkUser._id }, { token: token });
    return res.status(201).json({
      userId: checkUser._id,
      isAdmin: checkUser.isAdmin,
      userData: {
        username: checkUser.username,
        email: checkUser.email,
        isAdmin: checkUser.isAdmin,
        userId: checkUser._id,
      },
      msg: "Logged in successfully",
      token: token,
      success: true,
    });
  }
};

export const Logout = async (req, res) => {
  res.send("Login sucessful");
};

export const getUserData = async (req, res) => {
  const { token } = req.query;
  try {
    const getUser = await User.findOne({ token });
    if (getUser) {
      res.status(200).json({
        msg: "User data fetched sucessfully",
        userData: {
          username: getUser.username,
          email: getUser.email,
          isAdmin: getUser.isAdmin,
          userId: getUser._id,
        },
        success: true,
      });
    } else {
      res.status(404).json({ msg: "User Token invalid", success: false });
    }
  } catch (error) {
    res.status(403).json({ msg: "Server error" });
  }
};
