import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/', (_: Request, res: Response) => {
  res.send({ test: 'hi' });
});
router.get('/:placeId', () => {});

export default router;
