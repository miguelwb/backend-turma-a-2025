import express from 'express';
const router = express.Router();

import escolaController from '../controllers/escola.controller.js';

router.get('/', escolaController.listarEscolas);
router.post('/',escolaController.createEscola);
router.patch('/:id',escolaController.updateEscola);
router.delete('/:id',escolaController.deleteEscola);

export default router;
