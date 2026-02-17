import express from "express";
import heroController from "../../../controllers/pages/homePage/heroController.js";

const router = express.Router();

// Create a new hero
router.post("/", heroController.createHero);

// Get all heroes
router.get("/", heroController.getAllHeroes);

// Get a single hero by ID
router.get("/:id", heroController.getHeroById);

// Update a hero
router.put("/:id", heroController.updateHero);

// Delete a hero
router.delete("/:id", heroController.deleteHero);

export default router;
