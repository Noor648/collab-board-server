import express from "express"
import getMessage from '../controllers/sample.js';

const router = express.Router();

// GET /api/message
router.get('/message', getMessage);

export default router;

