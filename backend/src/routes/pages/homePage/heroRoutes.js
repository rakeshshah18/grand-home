import express from "express";
import heroController from "../../../controllers/pages/homePage/heroController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// Create a new hero
router.post("/", protect, heroController.createHero);

// Get all heroes
router.get("/", heroController.getAllHeroes);

// Get a single hero by ID
router.get("/:id", heroController.getHeroById);

// Update a hero
router.put("/:id", protect, heroController.updateHero);

// Delete a hero
router.delete("/:id", protect, heroController.deleteHero);

export default router;
