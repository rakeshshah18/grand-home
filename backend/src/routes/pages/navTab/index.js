import express from "express";
import navTabRoutes from "./navTabRoutes.js";

console.log('[DEBUG] navTab/index.js loaded');

const router = express.Router();

// Nav tab routes
router.use("/", navTabRoutes);

export default router;
