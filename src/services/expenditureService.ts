import { IExpenditure } from '../interfaces/expenditureInterface';
import * as model from '../models/expenditureModel';
import * as categoryModel from '../models/categoryModel';

export async function create(expenditure: IExpenditure) {
  const isCategoryExistent = await categoryModel.readOne(expenditure.category);

  if (!isCategoryExistent) throw new Error('Category not existent.');

  const createdExpenditure = await model.create(expenditure);

  return createdExpenditure;
}
