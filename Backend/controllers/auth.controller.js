import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    //validation
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password's do not match", success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be 6 characters long",
        success: false,
      });
    }
    const user = await User.findOne({ username });

    //checking if the User is already exist or not
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist, please login" });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // profilePhoto
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //creating the User in DB
    const newUser = await User.create({
      fullname,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    //generating the token from the function generateToken
    const token = generateToken(newUser._id);

    //sending the cookie
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    //sending the response of successfully creation of account
    return res.status(201).json({
      message: "Account Created Successfully",
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilePhoto: newUser.profilePhoto,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ username });

    //checking if the user exists or not
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }

    //checking password is correct or not
    const isPasswordMacth = await bcrypt.compare(password, user.password);

    //if password is incorrect then sending the response of incorrect username or password
    if (!isPasswordMacth) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }

    //if password is correct then sending the cookie and successful login message

    let token = generateToken(user._id);
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.status(200).json({
      message: `Welcome Back ${user.fullname}`,
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePhoto: user.profilePhoto,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
