import express from "express";
import navTabRoutes from "./pages/navTab/index.js";

console.log('[DEBUG] src/routes/index.js loaded');

const router = express.Router();

// Nav tab routes
router.use("/navtab", navTabRoutes);

export default router;
