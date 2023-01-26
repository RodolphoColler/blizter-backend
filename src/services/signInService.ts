import bcrypt from 'bcryptjs';
import * as model from '../models/signInModel';
import { jwtToken } from '../helpers/jwt';
import { ILogin } from '../interfaces/signInInterface';
import { unauthorizedError } from '../errors';

export async function validate({ email, password }: ILogin) {
  const user = await model.readOne(email);

  if (!user) throw unauthorizedError('Incorrect email or password.');

  if (!user.password) throw unauthorizedError('Incorrect email or password.');

  const isPasswordMatching = await bcrypt.compare(password, user.password);

  if (!isPasswordMatching) throw unauthorizedError('Incorrect email or password.');

  const token = jwtToken(user.id);

  return token;
}

export async function socialValidate(email: string) {
  const user = await model.readOne(email);

  if (!user || user.password) throw unauthorizedError('Incorrect email or password.');

  const token = jwtToken(user.id);

  return token;
}
