import express from "express";
import { getFooter, updateFooter } from "../../../controllers/pages/homePage/footerController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFooter);
router.put("/", protect, updateFooter);

export default router;
