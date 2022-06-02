import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { JWT_SECRET } = process.env;

const jwtConfig = { expiresIn: '7d' };

export function jwtToken(id: number) {
  return jwt.sign({ id }, JWT_SECRET || '', jwtConfig);
}
