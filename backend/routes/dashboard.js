import express from 'express';
import authMiddleware from '../middleware/authMiddleWare.js';
import { getSummary } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/summary',authMiddleware, getSummary)

export default router;