import express from "express";
import tabsController from "../../../controllers/pages/navTab/tabsController.js";

console.log('[DEBUG] navTabRoutes.js loaded');
console.log('[DEBUG] tabsController:', Object.keys(tabsController));

const router = express.Router();

// Create a new nav tab
router.post("/", tabsController.createTabItem);

// Get all nav tabs
router.get("/", tabsController.getAllTabItems);

// Get a single nav tab by ID
router.get("/:id", tabsController.getTabItemById);

// Update a nav tab by ID
router.put("/:id", tabsController.updateTabItem);

// Delete a nav tab by ID
router.delete("/:id", tabsController.deleteTabItem);

export default router;
