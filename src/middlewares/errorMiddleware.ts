import { Response, Request, NextFunction } from 'express';

export default function errorHandle(error: any, _req: Request, res: Response, _next: NextFunction) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Inside server error.' });
}
