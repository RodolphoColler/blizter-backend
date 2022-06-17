import { Request, Response, NextFunction } from 'express';
import * as schemas from '../schemas/salarySchema';

export function create(req: Request, res: Response, next: NextFunction) {
  const { value, date } = req.body;

  const { error } = schemas.create.validate({ value, date });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}

export function readOne(req: Request, res: Response, next: NextFunction) {
  const { date } = req.query;

  const { error } = schemas.readOne.validate({ date });

  if (error) return res.status(400).json({ message: error.message });

  return next();
}
