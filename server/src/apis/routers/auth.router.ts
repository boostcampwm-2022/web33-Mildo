import express from 'express';

import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware.authorizationUser, authController.getUserAuth);
router.post(
  '/bookmark/:areaName/:userId',
  authMiddleware.authorizationUser,
  authController.addBookmark
);

router.delete(
  '/bookmark/:areaName/:userId',
  authMiddleware.authorizationUser,
  authController.deleteBookmark
);

export default router;
