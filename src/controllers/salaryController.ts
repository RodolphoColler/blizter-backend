import { Response, Request } from 'express';
import * as service from '../services/salaryService';

enum errors {
  'User not exists.' = 400,
}

export async function create(req: Request, res: Response) {
  try {
    const { value, date } = req.body;
    const { id: userId } = req.tokenPayload;

    const createdSalary = await service.create({ value, userId, date });

    return res.status(201).json({ salary: createdSalary });
  } catch (error: any) {
    const { message } = error;

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}