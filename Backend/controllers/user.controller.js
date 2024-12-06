import { User } from "../models/user.model.js";

export const getOtherUsers = async (req, res) => {
  try {
    const loggedInUserID = req.user._id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserID } }).select(
      "-password"
    );

    return res.status(200).json(otherUsers);
  } catch (error) {}
};
