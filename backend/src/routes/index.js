import express from "express";
import navTabRoutes from "./pages/navTab/index.js";
import heroRoutes from "./pages/homePage/heroRoutes.js";
import featuresRoute from "./pages/homePage/featuresRoute.js";
import ourValuesRoutes from "./pages/homePage/ourValuesRoutes.js";

console.log('[DEBUG] src/routes/index.js loaded');

const router = express.Router();

// Nav tab routes
router.use("/navtab", navTabRoutes);

// Hero routes  
router.use("/hero", heroRoutes);

// Features routes
router.use("/features", featuresRoute);

// Our values routes
router.use("/ourValues", ourValuesRoutes);

export default router;
