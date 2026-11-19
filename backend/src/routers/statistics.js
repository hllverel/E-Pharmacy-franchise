import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import {
  getStatisticsController,
  getClientGoodsController,
} from '../controllers/statistics.js';

const router = Router();

router.use(ctrlWrapper(authenticate));

router.get('/', ctrlWrapper(getStatisticsController));

router.get(
  '/:clientId/goods',
  validateObjectId('clientId'),
  ctrlWrapper(getClientGoodsController),
);

export default router;