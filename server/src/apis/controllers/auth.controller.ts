import { Request, Response } from 'express';

export default {
  getUserAuth: async (_: Request, res: Response) => {
    res.json({ ok: true });
  }
};
