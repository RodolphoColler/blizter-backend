import { Request, Response, NextFunction } from 'express';
import * as schemas from '../schemas/expenditureSchema';

export function create(req: Request, res: Response, next: NextFunction) {
  const { value, date, categoryId, description } = req.body;

  const { error } = schemas.create.validate({ value, date, categoryId, description });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}

export function read(req: Request, res: Response, next: NextFunction) {
  const { date } = req.query;

  const { error } = schemas.read.validate({ date });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}

export function monthExpense(req: Request, res: Response, next: NextFunction) {
  const { date } = req.query;

  const { error } = schemas.monthExpense.validate({ date });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}
