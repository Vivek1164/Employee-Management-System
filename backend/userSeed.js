import User from "./models/User.js";
import bcrypt from "bcryptjs";
import connectToDB from "./db/db.js";

const userRegister = async (req, res) => {
  connectToDB();
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "admin",
      email: "adin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
