import express from 'express';
import onibusController from '../controllers/onibus.controller.js';

const router = express.Router();

router.post('/', onibusController.createOnibus);
router.patch('/:id', onibusController.updateOnibus);
router.delete('/:id', onibusController.deleteOnibus);

export default router;
