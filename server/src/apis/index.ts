import express from 'express';
import seoulRouter from './routers/seoul.router';
import naverRouter from './routers/naver.router';

const router = express.Router();

router.use('/seoul', seoulRouter);
router.use('/naver', naverRouter);

export default router;
