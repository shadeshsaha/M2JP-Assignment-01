import { Router } from 'express';
import { ProductControllers } from './product.controller';

const router = Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.updateProduct);
router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRouter = router;
