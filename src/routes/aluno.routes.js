import express from 'express';
const router = express.Router();

import { getAllAlunos, createAluno, deleteAluno, updateAluno, loginAluno, uploadFotoAluno } from '../controllers/aluno.controller.js';
import { upload } from '../utils/upload.js';

router.get('/', getAllAlunos);
router.post('/adicionar', createAluno);
router.delete('/:ra', deleteAluno);
router.patch('/:ra', updateAluno);
router.post('/login', loginAluno);
router.post('/:ra/foto', upload.single('foto'), uploadFotoAluno);

export default router;