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
    return res
      .status(201)
      .json({ msg: "Logged in successfully", token: token, success: true });
  }
};

export const Logout = async (req, res) => {
  res.send("Login sucessful");
};
