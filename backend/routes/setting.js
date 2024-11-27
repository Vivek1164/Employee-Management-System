import express from "express";
import authMiddleware from "../middleware/authMiddleWare.js";
import { changePassword } from "../controllers/settingController.js";


const router = express.Router();


router.put("/change-password", authMiddleware, changePassword); 



export default router;
