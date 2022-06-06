import { Request, Response, NextFunction } from 'express';
import expenditureSchema from '../schemas/expenditureSchema';

export default (req: Request, res: Response, next: NextFunction) => {
  const { expenditure, userId, date, category } = req.body;

  const { error } = expenditureSchema.validate({ expenditure, userId, date, category });

  if (error) return res.status(400).json({ message: error.message });

  return next();
};
