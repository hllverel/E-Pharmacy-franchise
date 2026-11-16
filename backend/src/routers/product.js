import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { isValidId } from '../middlewares/isValidId.js';
import { checkShopOwner } from '../middlewares/checkShopOwner.js';
import { upload } from '../middlewares/upload.js';
import { createProductSchema, productQuerySchema } from '../validation/product.js';
import {
  createProductController,
  getProductsController,
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

export default router;