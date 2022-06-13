import { Response, Request } from 'express';
import { IQueryExpenditure } from '../interfaces/expenditureInterface';
import * as service from '../services/expenditureService';

enum errors {
  'Category not existent.' = 400,
  'User not exists.' = 400,
}

export async function create(req: Request, res: Response) {
  try {
    const { expenditure, date, category } = req.body;
    const { id: userId } = req.tokenPayload;

    const createdExpenditure = await service.create({ expenditure, userId, date, category });

    return res.status(201).json({ expenditure: createdExpenditure });
  } catch (error: any) {
    const { message } = error;

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}

export async function read(req: Request, res: Response) {
  try {
    const { category, date} = req.query as unknown as IQueryExpenditure;

    const { id } = req.params;

    const expenditures = await service.read({ id: Number(id), category, date});

    return res.status(200).json({ expenditures });
  } catch (error: any) {
    const { message } = error;

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}
