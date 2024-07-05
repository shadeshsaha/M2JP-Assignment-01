import { Router } from 'express';
import { OrderControllers } from './order.controller';

const router = Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getAllOrders);

export const OrderRouter = router;
