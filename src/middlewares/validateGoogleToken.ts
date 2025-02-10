import { NextFunction, Response, Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { ISocialTokenPayload } from '../interfaces/tokenInterface';

const client = new OAuth2Client('100199167052-19lork61n9cr47i04m6n8230juu4hvos.apps.googleusercontent.com');

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'Your request must have a token.' });

    const response = await client.verifyIdToken({
      idToken: authorization,
      audience: '100199167052-19lork61n9cr47i04m6n8230juu4hvos.apps.googleusercontent.com',
    });

    const { payload } = response.getAttributes();

    if (!payload) res.status(401).json({ message: 'Not valid token.' });

    const { email, name } = payload as unknown as ISocialTokenPayload;

    req.socialTokenPayload = { email, name };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not valid token.' });
  }
};
