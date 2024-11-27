import jwt from "jsonwebtoken";
import User from "../models/User.js";



const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Token invalid" });
    }

    const user = await User.findById({_id: decoded._id}).select("-password");

    if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next()

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" })
  }
};

export default verifyUser;
