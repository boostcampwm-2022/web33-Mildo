import express from 'express';
import seoulRouter from './routers/seoul.router';
import naverRouter from './routers/naver.router';
import authRouter from './routers/auth.router';

const router = express.Router();

router.use('/seoul', seoulRouter);
router.use('/naver', naverRouter);
router.use('/auth', authRouter);

export default router;
