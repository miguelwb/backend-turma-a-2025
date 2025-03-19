import express from 'express';
const router = express.Router();

import paymentController from '../controllers/payment.controller.js';

router.post('/payment',paymentController.createPayment);
router.patch('/payment/:id',paymentController.upadtePayment);
router.delete('/payment/:id',paymentController.deletePayment);

export default router;