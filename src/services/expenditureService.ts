import { IExpenditure, IQueryExpenditure } from '../interfaces/expenditureInterface';
import * as model from '../models/expenditureModel';
import * as categoryModel from '../models/categoryModel';
import * as userModel from '../models/userModel';

export async function create(expenditure: IExpenditure) {
  const isCategoryExistent = await categoryModel.readOne(expenditure.category);

  if (!isCategoryExistent) throw new Error('Category not existent.');

  const createdExpenditure = await model.create(expenditure);

  return createdExpenditure;
}

export async function read({ id, category, date }: IQueryExpenditure) {
  const isUserExistent = await userModel.readOneById(id);

  if (!isUserExistent) throw new Error('User not exists.');

  const isCategoryExistent = await categoryModel.readOne(category);

  if (!isCategoryExistent) throw new Error('Category not existent.');

  const expenditures = await model.read({ id, category, date });

  return expenditures;
}
