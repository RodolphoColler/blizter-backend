import { Response, Request, NextFunction } from 'express';
import * as service from '../services/userService';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name } = req.body;

    const token = await service.create({ email, password, name });

    return res.status(204).cookie('token', token, { httpOnly: true }).end();
  } catch (error) {
    return next(error);
  }
}
