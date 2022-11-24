import express from 'express';

import naverController from '../controllers/naver.controller';

const router = express.Router();

router.get('/', naverController.getGeoCodingFromCoords);

export default router;
