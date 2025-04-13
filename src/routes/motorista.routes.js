import express from 'express';
import motoristaController from '../controllers/motorista.controller.js';

const router = express.Router();

router.post('/', motoristaController.createMotorista);
router.patch('/:id', motoristaController.updateMotorista);
router.delete('/:id', motoristaController.deleteMotorista);

export default router;
