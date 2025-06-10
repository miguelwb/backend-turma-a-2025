import express from 'express';
const router = express.Router();

import {getAllAlunos, createAluno} from '../controllers/aluno.controller.js';

router.get('/',alunoController.getAllAlunos);
router.post('/',alunoController.createAluno);
router.patch('/:id',alunoController.updateAluno);
router.delete('/:id',alunoController.deleteAluno);

export default router;