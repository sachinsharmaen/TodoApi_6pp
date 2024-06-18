import User from "../models/user.models.js";
import brcypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid username or password", 401));
    }

    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid username or password", 401));
    }

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already Exist", 404));
    }

    const hasedpassword = await brcypt.hash(password, 10);
    user = await User.create({ name, email, password: hasedpassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyprofile = (req, res) => {
  res.json({
    success: true,
    message: "User existing",
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { 
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development"? "lax" :"none", 
      secure: process.env.NODE_ENV === "Development"? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
