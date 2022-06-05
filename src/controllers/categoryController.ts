import { Response, Request } from 'express';
import * as service from '../services/categoryService';

export async function read(_req: Request, res: Response) {
  try {
    const categories = await service.read();

    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: 'Inside server error.' });
  }
}
