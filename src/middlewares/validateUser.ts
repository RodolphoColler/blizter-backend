import { Request, Response, NextFunction } from 'express';
import userSchema from '../schemas/userSchema';

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;

  const { error } = userSchema.validate({ email, password, name });

  if (error) return res.status(400).json({ message: error.message });

  return next();
};
