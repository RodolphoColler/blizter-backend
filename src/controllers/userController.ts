import { Response, Request } from 'express';
import * as service from '../services/userService';

enum errors {
  'User already exist.' = 400,
}

export async function create(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    const token = await service.create({ email, password, name });

    return res.status(201).json({ token });
  } catch (error: any) {
    const { message } = error;

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}
