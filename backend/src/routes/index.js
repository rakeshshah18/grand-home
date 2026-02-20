import express from "express";
import navTabRoutes from "./pages/navTab/index.js";
import heroRoutes from "./pages/homePage/heroRoutes.js";
import featuresRoute from "./pages/homePage/featuresRoute.js";
import ourValuesRoutes from "./pages/homePage/ourValuesRoutes.js";
import ourProjectRoutes from "./pages/homePage/ourProjectRoutes.js";
import aboutRoute from "./pages/homePage/aboutRoute.js";
import aboutPageRoutes from "./pages/aboutPage/about.js";
import pointsCallRoutes from "./pages/aboutPage/pointsCall.js";
import blogRoutes from "./pages/blogs/blogRoutes.js";
import getInTouchRoutes from "./pages/contact/getInTouchRoutes.js";

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

// Our projects routes
router.use("/ourProjects", ourProjectRoutes);

// About routes
router.use("/about", aboutRoute);

// About page routes
router.use("/aboutPage", aboutPageRoutes);

// Points call routes
router.use("/pointsCall", pointsCallRoutes);

// Blog routes
router.use("/blogs", blogRoutes);

// Contact routes
router.use("/getInTouch", getInTouchRoutes);


export default router;
