import express from 'express';
import ourProjectController from '../../../controllers/pages/homePage/ourProjectsController.js';

const router = express.Router();

/* ---------------- CREATE ---------------- */
router.post('/', ourProjectController.createProject);

/* ---------------- READ ---------------- */
router.get('/', ourProjectController.getAllProjects);
router.get('/:id', ourProjectController.getProjectById);

/* ---------------- UPDATE ---------------- */
router.put('/:id', ourProjectController.updateProject);
/* optional partial update */
router.patch('/:id', ourProjectController.updateProject);

/* ---------------- DELETE ---------------- */
router.delete('/:id', ourProjectController.deleteProject);

export default router;
