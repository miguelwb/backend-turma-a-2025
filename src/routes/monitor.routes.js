import express from 'express';
import monitorController from '../controllers/monitor.controller.js';

const router = express.Router();

router.post('/', monitorController.createMonitor);
router.patch('/:id', monitorController.updateMonitor);
router.delete('/:id', monitorController.deleteMonitor);

export default router;
