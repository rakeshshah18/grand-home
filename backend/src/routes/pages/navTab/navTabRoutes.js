import express from "express";
import tabsController from "../../../controllers/pages/navTab/tabsController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// ========== Top-level Tab Routes ==========

// Create a new top-level navigation tab
router.post("/", protect, tabsController.createTabItem);

// Get all navigation tabs
router.get("/", tabsController.getAllTabItems);

// Get a single navigation tab by ID
router.get("/:id", tabsController.getTabItemById);

// Update a navigation tab by ID
router.put("/:id", protect, tabsController.updateTabItem);

// Delete a navigation tab by ID
router.delete("/:id", protect, tabsController.deleteTabItem);

// ========== Child Item Routes ==========

// Add a child item to a parent tab
router.post("/:parentId/children", protect, tabsController.addChildToTab);

// Get all children of a specific tab
router.get("/:parentId/children", tabsController.getChildrenOfTab);

// Update a child item
router.put("/:parentId/children/:childId", protect, tabsController.updateChildItem);

// Delete a child item
router.delete("/:parentId/children/:childId", protect, tabsController.deleteChildItem);

// Add a nested child (child of a child)
router.post("/:parentId/children/:childId/nested", protect, tabsController.addNestedChild);

export default router;
