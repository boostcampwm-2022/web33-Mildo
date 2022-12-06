import express from 'express';
import dotenv from 'dotenv';

import seoulController from '../controllers/seoul.controller';

dotenv.config();

const router = express.Router();

router.get('/', seoulController.allAreas);
router.get('/search', seoulController.searchArea);
router.get('/:areaName', seoulController.pastInfo);

export default router;
