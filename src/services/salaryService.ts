import { notFoundError } from '../errors';
import { IQuerySalary, ISalary, ISalaryUpdate } from '../interfaces/salaryInterface';
import * as model from '../models/salaryModel';
import * as userModel from '../models/userModel';

export async function create(salary: ISalary) {
  const isUserExistent = await userModel.readOneById(salary.userId);

  if (!isUserExistent) throw notFoundError('User not exists.');

  const createdSalary = await model.create(salary);

  return createdSalary;
}

export async function readOne({ userId, date }: IQuerySalary) {
  const isUserExistent = await userModel.readOneById(userId);

  if (!isUserExistent) throw notFoundError('User not exists.');

  const [salary] = await model.readOne({ userId, date });

  if (!salary) throw notFoundError('Salary not exists.');

  return salary;
}

export async function updateOne({ id, value }: ISalaryUpdate) {
  const isSalaryExistent = await model.readOneById(id);

  if (!isSalaryExistent) throw notFoundError('Salary not exists.');

  const salary = await model.updateOne({ id, value });

  return salary;
}
