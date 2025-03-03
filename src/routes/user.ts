import { Router, Request, Response } from 'express';
import prisma from '../models/prisma';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  return res.status(201).json({ categories });
});

export default router;
