import express from "express";
import dynamicPageController from "../../controllers/pages/dynamicPageController.js";

const router = express.Router();

// Save or Update content
router.post("/save", dynamicPageController.upsertPageContent);

// Get content by path (query param)
router.get("/content", dynamicPageController.getPageByPath);

// Delete content by ID
router.delete("/:id", dynamicPageController.deletePage);

export default router;
