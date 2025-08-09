import { Router } from 'express';
import { authRoute } from '../modulers/auth/auth.route';
import { productRoute } from '../modulers/product/product.route';
import { saleRoute } from '../modulers/sales/sales.route';
import { cartRoute } from '../modulers/cart/cart.route';

const router = Router();

const moduleRoute = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/',
    route: productRoute,
  },
  {
    path: '/',
    route: saleRoute,
  },
  {
    path: '/',
    route: cartRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
