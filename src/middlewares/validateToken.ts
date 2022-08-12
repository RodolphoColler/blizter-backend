import { NextFunction, Response, Request } from 'express';
import { jwtVerify } from '../helpers/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(400).json({ message: 'Your request must have a token.' });

    req.tokenPayload = jwtVerify(token);

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not valid token.' });
  }
};
