import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/tokenInterface';

dotenv.config();
const { JWT_SECRET } = process.env;

const jwtConfig = { expiresIn: '7d' };

export function jwtToken(id: number) {
  return jwt.sign({ id }, JWT_SECRET || '', jwtConfig);
}

export function jwtVerify(token: string) {
  return jwt.verify(token, JWT_SECRET || '') as ITokenPayload;
}
