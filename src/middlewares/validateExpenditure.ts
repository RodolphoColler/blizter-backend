import { Request, Response, NextFunction } from 'express';
import expenditureSchema from '../schemas/expenditureSchema';

export default (req: Request, res: Response, next: NextFunction) => {
  const { expenditure, date, category } = req.body;

  const { error } = expenditureSchema.validate({ expenditure, date, category });

  if (error) return res.status(400).json({ message: error.message });

  return next();
};
