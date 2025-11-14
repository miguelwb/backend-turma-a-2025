import express from 'express';
import notificacaoController from '../controllers/notificacao.controller.js';

const router = express.Router();

router.get('/', notificacaoController.listar);
router.post('/', notificacaoController.create);
router.patch('/:id/lida', notificacaoController.marcarLida);

export default router;