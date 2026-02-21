import express from 'express';
import ourProjectController from '../../../controllers/pages/homePage/ourProjectsController.js';
import { protect } from '../../../middleware/authMiddleware.js';

const router = express.Router();

/* ---------------- CREATE ---------------- */
router.post('/', protect, ourProjectController.createProject);

/* ---------------- READ ---------------- */
router.get('/', ourProjectController.getAllProjects);
router.get('/:id', ourProjectController.getProjectById);

/* ---------------- UPDATE ---------------- */
router.put('/:id', protect, ourProjectController.updateProject);
/* optional partial update */
router.patch('/:id', protect, ourProjectController.updateProject);

/* ---------------- DELETE ---------------- */
router.delete('/:id', protect, ourProjectController.deleteProject);

export default router;
