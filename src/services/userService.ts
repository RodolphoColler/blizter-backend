import bcrypt from 'bcryptjs';
import * as model from '../models/userModel';
import { IUser } from '../interfaces/userInterface';
import { jwtToken } from '../helpers/jwt';

export async function create({ email, password, name }: IUser) {
  const isUserExistent = await model.readOne(email);

  if (isUserExistent) throw new Error('user already exist');

  const encryptedPassword = await bcrypt.hash(password, 10);

  await model.create({ email, password: encryptedPassword, name });

  const user = await model.readOne(email);

  if (!user) throw new Error('It\'s not possible crete your user');

  const token = jwtToken(user);

  return token;
}
