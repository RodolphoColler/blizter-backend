import { NextFunction, Response, Request } from 'express';
import { jwtVerify } from '../helpers/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'Your request must have a token.' });

    req.tokenPayload = jwtVerify(authorization);

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not valid token.' });
  }
};
