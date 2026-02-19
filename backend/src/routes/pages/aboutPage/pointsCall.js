import express from "express";
import {
  createPointsCall,
  getAllPointsCall,
  getPointsCallById,
  updatePointsCall,
  deletePointsCall,
} from "../../../controllers/pages/aboutPage/pointCall.js";

const router = express.Router();

router.post("/", createPointsCall);
router.get("/", getAllPointsCall);
router.get("/:id", getPointsCallById);
router.put("/:id", updatePointsCall);
router.delete("/:id", deletePointsCall);

export default router;