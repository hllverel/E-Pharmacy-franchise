import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { isValidId } from '../middlewares/isValidId.js';
import { checkShopOwner } from '../middlewares/checkShopOwner.js';
import { isValidProductId } from '../middlewares/isValidProductId.js';
import { upload } from '../middlewares/upload.js';
import { createProductSchema, productQuerySchema, updateProductSchema, reviewsQuerySchema } from '../validation/product.js';
import {
  createProductController,
  getProductsController, getProductByIdController, addToShopController, updateProductController, deleteProductController, getProductReviewsController
} from '../controllers/product.js';

const router = Router({ mergeParams: true });

router.use(isValidId, ctrlWrapper(checkShopOwner));

router.get('/', validateQuery(productQuerySchema), ctrlWrapper(getProductsController));

router.post(
  '/add',
  upload.single('photo'),
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

router.get('/:productId', isValidProductId, ctrlWrapper(getProductByIdController));

router.post(
  '/:productId/add-to-shop',
  isValidProductId,
  ctrlWrapper(addToShopController),
);

router.put(
  '/:productId/edit',
  isValidProductId,
  upload.single('photo'),
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);

router.delete(
  '/:productId/delete',
  isValidProductId,
  ctrlWrapper(deleteProductController),
);

router.get(
  '/:productId/reviews',
  isValidProductId,
  validateQuery(reviewsQuerySchema),
  ctrlWrapper(getProductReviewsController),
);

export default router;