import { Response, Request } from 'express';
import * as service from '../services/loginService';

enum errors {
  'Incorrect email or password.' = 400,
}

export async function validate(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const token = await service.validate({ email, password });

    return res.status(200).json({ token });
  } catch (error: any) {
    const { message } = error;

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}
