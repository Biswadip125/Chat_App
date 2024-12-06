import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    //if token is not available then sending response of user not authenticated
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not Authenticated", success: false });
    }

    //verifying the token is valid or not
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //if not valid then sending response of invalid token
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    //finding the user
    const user = await User.findOne({ _id: decoded.userId }).select(
      "-password"
    );

    //if user is not found then sending error response of user not found
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //creating a user field in the request object and the setting the user object to it
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
};

export default isAuthenticated;
