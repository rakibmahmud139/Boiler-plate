import express from 'express';
import { auth } from '../../middlewares/auth';
import { cartControllers } from './cart.controller';

const router = express.Router();

router.post(
  '/cart/add-cart/:productId',
  auth('manager', 'salesman'),
  cartControllers.addProductIntoCart,
);

router.get(
  '/cart/my-cart',
  auth('manager', 'salesman'),
  cartControllers.getCartProduct,
);

router.patch(
  '/cart/update-cart-quantity/:productId',
  auth('manager', 'salesman'),
  cartControllers.updateCartProductQuantity,
);

router.delete(
  '/cart/:id',
  auth('manager', 'salesman'),
  cartControllers.deleteCart,
);

export const cartRoute = router;
