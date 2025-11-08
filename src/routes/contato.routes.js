import express from 'express';
import { enviarContato } from '../controllers/contato.controller.js';

const router = express.Router();

router.post('/enviar', enviarContato);

export default router;