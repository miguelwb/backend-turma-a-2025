import express from 'express';
import rotaController from '../controllers/rota.controller.js';

const router = express.Router();

router.post('/', rotaController.create);

export default router;