import express from "express";
import navTabRoutes from "./pages/navTab/index.js";
import heroRoutes from "./pages/homePage/heroRoutes.js";

console.log('[DEBUG] src/routes/index.js loaded');

const router = express.Router();

// Nav tab routes
router.use("/navtab", navTabRoutes);

// Hero routes
router.use("/hero", heroRoutes);

export default router;
