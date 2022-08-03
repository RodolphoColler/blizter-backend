import { Response, Request, NextFunction } from 'express';
import { IQuerySalary } from '../interfaces/salaryInterface';
import * as service from '../services/salaryService';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { value, date } = req.body;
    const { id: userId } = req.tokenPayload;

    const createdSalary = await service.create({ value, userId, date });

    return res.status(201).json({ salary: createdSalary });
  } catch (error) {
    return next(error);
  }
}

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const { date } = req.query as unknown as IQuerySalary;
    const { id: userId } = req.tokenPayload;

    const salary = await service.read({ userId, date });

    return res.status(200).json({ salary });
  } catch (error) {
    return next(error);
  }
}

export async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { value } = req.body;
    const { id } = req.params;

    const salary = await service.updateOne({ id: Number(id), value });

    return res.status(200).json({ salary });
  } catch (error) {
    return next(error);
  }
}
