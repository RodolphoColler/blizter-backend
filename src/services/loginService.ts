import bcrypt from 'bcryptjs';
import * as model from '../models/loginModel';
import { jwtToken } from '../helpers/jwt';
import { ILogin } from '../interfaces/loginInterface';

export async function validate({ email, password }: ILogin) {
  const user = await model.readOne(email);

  if (!user) throw new Error('Incorrect email or password.');

  const isPasswordMatching = await bcrypt.compare(password, user.password);

  if (!isPasswordMatching) throw new Error('Incorrect email or password.');

  const token = jwtToken(user.id);

  return token;
}
