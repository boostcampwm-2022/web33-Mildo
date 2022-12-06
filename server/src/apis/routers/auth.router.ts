import express from 'express';

import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware.authorizationUser, authController.getUserAuth);
router.post(
  '/:userId/bookmark/:areaName',
  authMiddleware.authorizationUser,
  authController.addBookmark
);

router.delete(
  '/:userId/bookmark/:areaName/',
  authMiddleware.authorizationUser,
  authController.deleteBookmark
);

export default router;
