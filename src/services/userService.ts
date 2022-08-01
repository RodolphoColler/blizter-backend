import bcrypt from 'bcryptjs';
import * as model from '../models/userModel';
import { IUser } from '../interfaces/userInterface';
import { jwtToken } from '../helpers/jwt';
import { conflictError } from '../errors';

export async function create({ email, password, name }: IUser) {
  const isUserExistent = await model.readOne(email);

  if (isUserExistent) throw conflictError('User already exist.');

  const encryptedPassword = await bcrypt.hash(password, 10);

  const { id } = await model.create({ email, password: encryptedPassword, name });

  const token = jwtToken(id);

  return token;
}
