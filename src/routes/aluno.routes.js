import express from 'express';
const router = express.Router();

import alunoController from '../controllers/aluno.controller.js';

router.post('/',alunoController.createAluno);
router.patch('/:id',alunoController.updateAluno);
router.delete('/:id',alunoController.deleteAluno);

export default router;