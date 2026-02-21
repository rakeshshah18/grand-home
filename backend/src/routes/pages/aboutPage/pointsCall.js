import express from "express";
import {
  createPointsCall,
  getAllPointsCall,
  getPointsCallById,
  updatePointsCall,
  deletePointsCall,
} from "../../../controllers/pages/aboutPage/pointCall.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPointsCall);
router.get("/", getAllPointsCall);
router.get("/:id", getPointsCallById);
router.put("/:id", protect, updatePointsCall);
router.delete("/:id", protect, deletePointsCall);

export default router;