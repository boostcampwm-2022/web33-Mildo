import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import naverController from '../controllers/naver.controller';
// import passport from 'passport';

dotenv.config();

const router = express.Router();

router.get('/', naverController.getGeoCodingFromCoords);
router.get('/auth/login', naverController.naverPassportLogin);
// router.get('/auth/logout');
router.get(
  '/auth/callback',
  naverController.naverPassportAuthMiddleware,
  naverController.getNaverPassportRedirectionSuccess
);
router.get('/session', (req: Request, res: Response) => {
  console.log(req.session);
  res.json({ ok: true });
});

export default router;
