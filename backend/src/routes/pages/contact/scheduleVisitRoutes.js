import express from "express";
import {
    getScheduledVisits,
    createScheduledVisit,
    deleteScheduledVisit
} from "../../../controllers/pages/contact/scheduleVisitController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getScheduledVisits);
router.post("/", createScheduledVisit);
router.delete("/:id", protect, deleteScheduledVisit);

export default router;
