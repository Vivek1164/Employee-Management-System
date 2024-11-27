import express from "express";
import authMiddleware from "../middleware/authMiddleWare.js";
import { getAllLeaves, getLeaveDetails, updateLeaveStatus } from "../controllers/manageLeaveController.js";


const router = express.Router();


router.get("/", authMiddleware, getAllLeaves); 
router.get("/:id", authMiddleware, getLeaveDetails)
router.put("/:id", authMiddleware, updateLeaveStatus)



export default router;
