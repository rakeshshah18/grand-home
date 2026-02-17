import express from "express";
import tabsController from "../../../controllers/pages/navTab/tabsController.js";

console.log('[DEBUG] navTabRoutes.js loaded');
console.log('[DEBUG] tabsController:', Object.keys(tabsController));

const router = express.Router();

// ========== Top-level Tab Routes ==========

// Create a new top-level navigation tab
router.post("/", tabsController.createTabItem);

// Get all navigation tabs
router.get("/", tabsController.getAllTabItems);

// Get a single navigation tab by ID
router.get("/:id", tabsController.getTabItemById);

// Update a navigation tab by ID
router.put("/:id", tabsController.updateTabItem);

// Delete a navigation tab by ID
router.delete("/:id", tabsController.deleteTabItem);

// ========== Child Item Routes ==========

// Add a child item to a parent tab
router.post("/:parentId/children", tabsController.addChildToTab);

// Get all children of a specific tab
router.get("/:parentId/children", tabsController.getChildrenOfTab);

// Update a child item
router.put("/:parentId/children/:childId", tabsController.updateChildItem);

// Delete a child item
router.delete("/:parentId/children/:childId", tabsController.deleteChildItem);

// Add a nested child (child of a child)
router.post("/:parentId/children/:childId/nested", tabsController.addNestedChild);

export default router;
