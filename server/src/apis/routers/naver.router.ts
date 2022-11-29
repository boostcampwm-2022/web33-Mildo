import express, { Request, Response } from 'express';
import passport from 'passport';

import naverController from '../controllers/naver.controller';

const router = express.Router();

router.get('/', naverController.getGeoCodingFromCoords);
router.get('/auth/login', passport.authenticate('naver'));
// router.get('/auth/logout');
router.get(
  '/auth/callback',
  passport.authenticate('naver', { failureRedirect: '/', session: false }),
  (_: Request, res: Response) => {
    res.redirect('http://localhost:3000/');
  }

  // naver?lng=${longitude}&lat=${latitude}
);

export default router;
