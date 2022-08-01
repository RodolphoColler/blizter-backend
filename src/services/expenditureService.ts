import { IExpenditure, IQueryExpenditure } from '../interfaces/expenditureInterface';
import * as model from '../models/expenditureModel';
import * as categoryModel from '../models/categoryModel';
import notFoundError from '../errors/notFoundError';

export async function create(expenditure: IExpenditure) {
  const isCategoryExistent = await categoryModel.readOne(expenditure.categoryId);

  if (!isCategoryExistent) throw notFoundError('Category not existent.');

  const createdExpenditure = await model.create(expenditure);

  return createdExpenditure;
}

export async function deleteOne(id: number) {
  const isExpenditureExistent = await model.readOne(id);

  if (!isExpenditureExistent) throw notFoundError('Expenditure not existent.');

  const deletedExpenditure = await model.deleteOne(id);

  return deletedExpenditure;
}

export async function read({ userId, date }: IQueryExpenditure) {
  const expenditures = await model.read({ userId, date });

  return expenditures;
}

export async function readMonthExpense({ userId, date }: IQueryExpenditure) {
  const groupedExpenditures = await model.readMonthExpense({ userId, date });

  const monthExpenditurePromises = groupedExpenditures.map(async ({ _sum, categoryId }) => ({
    sum: _sum.value,
    category: await categoryModel.readOne(categoryId),
  }));

  const monthExpenditure = await Promise.all(monthExpenditurePromises);

  return monthExpenditure;
}
