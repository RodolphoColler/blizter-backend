import { Response, Request } from 'express';
import * as service from '../services/userService';

enum errors {
  'User already exist.' = 400,
  'Category not existent.' = 400,
  'User not exists.' = 400,
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

export async function updateCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.body;
    const { id } = req.params;

    const categories = await service.updateCategory(Number(id), categoryId);

    return res.status(200).json(categories);
  } catch (error: any) {
    const { message } = error;   

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}

export async function readCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const categories = await service.readCategory(Number(id));

    return res.status(200).json(categories);
  } catch (error: any) {
    const { message } = error;   

    if (message in errors) return res.status(Number(errors[message])).json({ message });

    return res.status(500).json({ message: 'Inside server error.' });
  }
}
