import express from "express";
import authMiddleware from "../middleware/authMiddleWare.js";
import { addLeave,getLeaves, getEmployeeLeaves } from "../controllers/leaveController.js";

const router = express.Router();


router.post("/add", authMiddleware, addLeave); 
router.get("/:id", authMiddleware, getLeaves); 
router.get("/employee/:id", authMiddleware, getEmployeeLeaves)


export default router;
