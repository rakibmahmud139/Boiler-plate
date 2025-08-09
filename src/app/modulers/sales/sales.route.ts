import express from 'express';
import { auth } from '../../middlewares/auth';
import { saleControllers } from './sales.controller';
import { validationRequest } from '../../middlewares/validationRequest';
import { salesValidation } from './sales.validation';

const router = express.Router();

router.post(
  '/sale/:id',
  auth('manager', 'salesman'),
  validationRequest(salesValidation.salesValidationSchema),
  saleControllers.createSale,
);

router.get(
  '/sale/history/:period',
  auth('manager', 'salesman'),
  saleControllers.salesHistory,
);

export const saleRoute = router;
