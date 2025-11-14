import express from 'express';
import pontoController from '../controllers/ponto.controller.js';

const router = express.Router();

router.get('/', pontoController.listarPontos);
router.post('/', pontoController.createPonto);
router.patch('/:id', pontoController.updatePonto);
router.delete('/:id', pontoController.deletePonto);

export default router;
