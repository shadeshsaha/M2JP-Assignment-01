import { Router } from 'express';
import { OrderRouter } from '../modules/Order/order.route';
import { ProductRouter } from '../modules/product/product.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/orders',
    route: OrderRouter,
  },
  {
    path: '/products',
    route: ProductRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
