import express from 'express';

import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware.authorizationUser, authController.getUserAuth);
router.get(
  '/userInfo/',
  authMiddleware.authorizationUser,
  authController.getUserInfo
);

export default router;
