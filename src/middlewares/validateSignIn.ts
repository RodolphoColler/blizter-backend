import { Request, Response, NextFunction } from 'express';
import * as schema from '../schemas/signInSchema';

export function validate(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const { error } = schema.validate.validate({ email, password });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}
