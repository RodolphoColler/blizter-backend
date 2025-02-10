import { Response, Request, NextFunction } from 'express';
import * as service from '../services/userService';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = req.body;

    const token = await service.create({ email, password, name });

    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
}

export async function createSocial(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, name } = req.socialTokenPayload;

    const token = await service.createSocial({ email, name });

    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
}
