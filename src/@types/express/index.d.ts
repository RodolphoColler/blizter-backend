import { ISocialTokenPayload, ITokenPayload } from '../../interfaces/tokenInterface';

declare global{
  namespace Express {
    interface Request {
      tokenPayload: ITokenPayload
      socialTokenPayload: ISocialTokenPayload
    }
  }
}
