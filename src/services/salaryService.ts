import { IQuerySalary, ISalary } from '../interfaces/salaryInterface';
import * as model from '../models/salaryModel';
import * as userModel from '../models/userModel';

export async function create(salary: ISalary) {
  const isUserExistent = await userModel.readOneById(salary.userId);

  if (!isUserExistent) throw new Error('User not exists.');

  const createdSalary = await model.create(salary);

  return createdSalary;
}

export async function readOne({ userId, date }: IQuerySalary) {
  const isUserExistent = await userModel.readOneById(userId);

  if (!isUserExistent) throw new Error('User not exists.');

  const salary = await model.readOne({ userId, date });

  if (!salary) throw new Error('Salary not exists.');

  return salary;
}
