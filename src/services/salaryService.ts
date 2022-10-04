import { conflictError, notFoundError } from '../errors';
import { IQuerySalary, ISalary, ISalaryUpdate } from '../interfaces/salaryInterface';
import * as model from '../models/salaryModel';

export async function create(salary: ISalary) {
  const [isSalaryExistent] = await model.read(salary);

  if (isSalaryExistent) throw conflictError('Salary already exists.');

  const createdSalary = await model.create(salary);

  return createdSalary;
}

export async function read({ userId, date }: IQuerySalary) {
  const [salary] = await model.read({ userId, date });

  if (!salary) throw notFoundError('Salary not exists.');

  return salary;
}

export async function updateOne({ id, value }: ISalaryUpdate) {
  const isSalaryExistent = await model.readOne(id);

  if (!isSalaryExistent) throw notFoundError('Salary not exists.');

  const salary = await model.updateOne({ id, value });

  return salary;
}
