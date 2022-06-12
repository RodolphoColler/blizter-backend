import { Response, Request } from 'express';
import * as service from '../services/expenditureService';

enum errors {
  'Category not existent.' = 400,
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
