import { Response, Request, NextFunction } from 'express';
import * as service from '../services/signInService';

export async function validate(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const token = await service.validate({ email, password });

    return res.status(204).cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true }).end();
  } catch (error) {
    return next(error);
  }
}
