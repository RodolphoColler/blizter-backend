import { IExpenditure } from '../interfaces/expenditureInterface';
import * as model from '../models/expenditureModel';

export async function create(expenditure: IExpenditure) {
  const createdExpenditure = await model.create(expenditure);

  return createdExpenditure;
}
