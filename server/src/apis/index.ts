import express from 'express';
import seoulRouter from './routers/seoul.router';

const router = express.Router();

router.use('/seoul', seoulRouter);

export default router;
