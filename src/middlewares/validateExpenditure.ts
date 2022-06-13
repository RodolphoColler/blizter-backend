import { Request, Response, NextFunction } from 'express';
import * as schemas from '../schemas/expenditureSchema';

export function create(req: Request, res: Response, next: NextFunction) {
  const { expenditure, date, category } = req.body;

  const { error } = schemas.create.validate({ expenditure, date, category });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}

export function read(req: Request, res: Response, next: NextFunction) {
  const { date, category } = req.query;

  const { error } = schemas.read.validate({ date, category });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}
