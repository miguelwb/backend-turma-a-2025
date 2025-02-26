import express from 'express';
const router = express.Router();

import paymentController from '../controllers/payment.controller.js';

router.post('/payment',paymentController.createPayment);

export default router;