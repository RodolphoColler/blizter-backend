import { Response, Request, NextFunction } from 'express';
import { IQueryExpenditure, IQueryMonthExpense } from '../interfaces/expenditureInterface';
import * as service from '../services/expenditureService';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { value, date, category, description } = req.body;
    const { id: userId } = req.tokenPayload;

    const createdExpenditure = await service.create({ value, userId, date, category, description });

    return res.status(201).json({ expenditure: createdExpenditure });
  } catch (error) {
    return next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const deletedExpenditure = await service.deleteOne(Number(id));

    return res.status(200).json({ expenditure: deletedExpenditure });
  } catch (error) {
    return next(error);
  }
}

export async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const { category, date } = req.query as unknown as IQueryExpenditure;

    const { id } = req.params;

    const expenditures = await service.read({ id: Number(id), category, date });

    return res.status(200).json({ expenditures });
  } catch (error) {
    return next(error);
  }
}

export async function readMonthExpense(req: Request, res: Response, next: NextFunction) {
  try {
    const { date, category } = req.query as unknown as IQueryMonthExpense;

    const { id } = req.params;

    const monthExpense = await service.readMonthExpense({ userId: Number(id), date, category });

    return res.status(200).json({ monthExpense });
  } catch (error) {
    return next(error);
  }
}
