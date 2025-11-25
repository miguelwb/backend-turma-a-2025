import express from 'express';
import rotaController from '../controllers/rota.controller.js';

const router = express.Router();

router.get('/', rotaController.list);
router.post('/', rotaController.create);
router.patch('/:id', rotaController.update);
router.delete('/:id', rotaController.remove);

export default router;
