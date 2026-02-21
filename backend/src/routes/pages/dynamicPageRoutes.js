import express from "express";
import dynamicPageController from "../../controllers/pages/dynamicPageController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Save or Update content
router.post("/save", protect, dynamicPageController.upsertPageContent);

// Get content by path (query param)
router.get("/content", dynamicPageController.getPageByPath);

// Delete content by ID
router.delete("/:id", protect, dynamicPageController.deletePage);

export default router;
