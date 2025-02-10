import bcrypt from 'bcryptjs';
import * as model from '../models/userModel';
import { ISocialUser, IUser } from '../interfaces/userInterface';
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

export async function createSocial({ email, name }: ISocialUser) {
  const user = await model.readOne(email);

  if (user) {
    const token = jwtToken(user.id);

    return token;
  }

  const { id } = await model.createSocial({ email, name });

  const token = jwtToken(id);

  return token;
}
