import { Response, Request, NextFunction } from 'express';
import * as service from '../services/loginService';

export async function validate(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const token = await service.validate({ email, password });

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}
