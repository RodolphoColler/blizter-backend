import bcrypt from 'bcryptjs';
import * as model from '../models/userModel';
import { IUser } from '../interfaces/userInterface';
import * as categoryModel from '../models/categoryModel';
import { jwtToken } from '../helpers/jwt';

export async function create({ email, password, name }: IUser) {
  const isUserExistent = await model.readOne(email);

  if (isUserExistent) throw new Error('User already exist.');

  const encryptedPassword = await bcrypt.hash(password, 10);

  const { id } = await model.create({ email, password: encryptedPassword, name });

  const token = jwtToken(id);

  return token;
}

export async function updateCategory(id: number, categoryId: number) {
  const isCategoryExistent = await categoryModel.readById(categoryId);

  if (!isCategoryExistent) throw new Error('Category not existent.');

  const categories = await model.updateCategory(id, categoryId);

  return categories;
}

export async function readCategory(id: number) {
  const isUserExistent = await model.readOneById(id);

  if (!isUserExistent) throw new Error('User not exists.');

  const categories = await model.readCategory(id);

  if (!categories) return { categories: [] };

  return categories;
}
