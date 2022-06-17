import { Response, Request } from 'express';
import { IQuerySalary } from '../interfaces/salaryInterface';
import * as service from '../services/salaryService';

enum errors {
  'User not exists.' = 400,
  'Salary not exists.' = 400,
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

export async function readOne(req: Request, res: Response) {
  try {
    const { date } = req.query as unknown as IQuerySalary;
    const { id } = req.params;

    const [ salary ] = await service.readOne({ userId: Number(id), date });

    return res.status(200).json({ salary });
  } catch (error: any) {
    const { message } = error;

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}