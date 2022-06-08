import { Express } from 'express';
import { ITokenPayload } from '../../interfaces/tokenInterface';

declare global{
  namespace Express {
    interface Request {
      tokenPayload: ITokenPayload
    }
  }
}
