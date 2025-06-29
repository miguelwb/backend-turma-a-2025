import express from 'express';
const router = express.Router();

import {getAllAlunos, createAluno, deleteAluno, updateAluno} from '../controllers/aluno.controller.js';

router.get('/',getAllAlunos);
router.post('/',createAluno);
router.delete('/:ra',deleteAluno);
router.patch('/:ra',updateAluno)

export default router;