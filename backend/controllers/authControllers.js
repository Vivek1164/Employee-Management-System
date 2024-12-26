import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "10d",
    });
    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const verify = async (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Verified", user: req.user });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "rigester successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Failed to register" });
  }
};

export { login, verify, register };
