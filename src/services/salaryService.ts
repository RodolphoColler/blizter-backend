import { ISalary } from '../interfaces/salaryInterface';
import * as model from '../models/salaryModel';
import * as userModel from '../models/userModel';

export async function create(salary: ISalary) {
  const isUserExistent = await userModel.readOneById(salary.userId);

  if (!isUserExistent) throw new Error('User not exists.');

  const createdSalary = await model.create(salary);

  return createdSalary;
}
