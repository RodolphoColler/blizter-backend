import { Response, Request, NextFunction } from 'express';
import * as service from '../services/categoryService';

export async function read(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await service.read();

    return res.status(200).json({ categories });
  } catch (error) {
    return next(error);
  }
}
