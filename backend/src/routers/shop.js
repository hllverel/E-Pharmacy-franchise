import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';
import { createShopSchema, updateShopSchema } from '../validation/shop.js';
import {
  createShopController,
  getShopController,
  updateShopController,
} from '../controllers/shop.js';
import productRouter from './product.js'

const router = Router();

router.use(ctrlWrapper(authenticate));

router.use('/:shopId/product', productRouter);

router.post(
  '/create',
  upload.single('logo'),
  validateBody(createShopSchema),
  ctrlWrapper(createShopController),
);

router.get('/:shopId', isValidId, ctrlWrapper(getShopController));

router.put(
  '/:shopId/update',
  isValidId,
  validateBody(updateShopSchema),
  ctrlWrapper(updateShopController),
);

export default router;