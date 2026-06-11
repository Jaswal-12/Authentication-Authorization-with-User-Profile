import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username: name,
      email,
      password: hashedPassword,
      age,
    });

    const token = jwt.sign(
      { id: createdUser._id, email },
      "shhhhh"
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      user: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};





export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "shhhhh"
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




export const Logout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged Out Successfully",
  });
};


export const Profile = async (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed",
    user: req.user,
  });
};