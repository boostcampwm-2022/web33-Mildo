import express from 'express';

import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware.authorizationUser, authController.getUserAuth);
router.post(
  '/bookmark',
  authMiddleware.authorizationUser,
  authController.addBookmark
);

export default router;
