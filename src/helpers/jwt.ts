import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const { JWT_SECRET } = process.env;

const jwtConfig = { expiresIn: '7d' };

export function jwtToken(user: { id: number, name: string }) {
  return jwt.sign(user, JWT_SECRET || '', jwtConfig);
}
