import { IExpenditure, IQueryExpenditure, IQueryMonthExpense } from '../interfaces/expenditureInterface';
import * as model from '../models/expenditureModel';
import * as categoryModel from '../models/categoryModel';
import * as userModel from '../models/userModel';

export async function create(expenditure: IExpenditure) {
  const isCategoryExistent = await categoryModel.readOne(expenditure.category);

  if (!isCategoryExistent) throw new Error('Category not existent.');

  const createdExpenditure = await model.create(expenditure);

  return createdExpenditure;
}

export async function deleteOne(id: number) {
  const isExpenditureExistent = await model.readOne(id);

  if (!isExpenditureExistent) throw new Error('Expenditure not existent.');

  const deletedExpenditure = await model.deleteOne(id);

  return deletedExpenditure;
}

export async function read({ id, category, date }: IQueryExpenditure) {
  const isUserExistent = await userModel.readOneById(id);

  if (!isUserExistent) throw new Error('User not exists.');

  const isCategoryExistent = await categoryModel.readOne(category);

  if (!isCategoryExistent) throw new Error('Category not existent.');

  const expenditures = await model.read({ id, category, date });

  return expenditures;
}

export async function readMonthExpense({ userId, date }: IQueryMonthExpense) {
  const isUserExistent = await userModel.readOneById(userId);

  if (!isUserExistent) throw new Error('User not exists.');

  const { _sum } = await model.readMonthExpense({ userId, date });

  if (!_sum.value) return { value: 0 };

  return _sum;
}
