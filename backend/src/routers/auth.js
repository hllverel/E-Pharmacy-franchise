import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { registerUserSchema, loginUserSchema } from '../validation/user.js';
import { registerUserController, loginUserController, logoutUserController, getUserInfoController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.get('/logout', ctrlWrapper(authenticate), ctrlWrapper(logoutUserController));
router.get('/user-info', ctrlWrapper(authenticate), ctrlWrapper(getUserInfoController));

export default router;