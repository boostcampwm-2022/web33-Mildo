import express from 'express';
import dotenv from 'dotenv';
import naverController from '../controllers/naver.controller';
// import passport from 'passport';

dotenv.config();

const router = express.Router();

router.get('/', naverController.getGeoCodingFromCoords);
router.get('/auth/login', naverController.naverPassportLogin);
// router.get('/auth/logout');
router.get('/auth/callback', naverController.naverPassportAuthMiddleware);

export default router;
