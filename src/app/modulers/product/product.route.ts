import express from 'express';
import { productControllers } from './product.controller';
import { auth } from '../../middlewares/auth';
import { validationRequest } from '../../middlewares/validationRequest';
import { productValidation } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  auth('manager', 'salesman'),
  validationRequest(productValidation.createProductValidationSchema),
  productControllers.createProduct,
);

router.get(
  '/products',
  auth('manager', 'salesman'),
  productControllers.getAllProduct,
);

router.get(
  '/products/:id',
  auth('manager', 'salesman'),
  productControllers.getSingleProduct,
);

router.put(
  '/products/:id',
  auth('manager', 'salesman'),
  validationRequest(productValidation.updateProductValidationSchema),
  productControllers.updateProduct,
);

router.put(
  '/duplicate-product/:id',
  auth('manager', 'salesman'),
  validationRequest(productValidation.updateProductValidationSchema),
  productControllers.duplicateProduct,
);
router.delete(
  '/products/bulk-delete',
  auth('manager'),
  productControllers.deleteManyProduct,
);
router.delete(
  '/products/:id',
  auth('manager', 'salesman'),
  productControllers.deleteSingleProduct,
);

export const productRoute = router;
