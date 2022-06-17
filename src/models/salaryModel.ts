import { IQuerySalary, ISalary } from '../interfaces/salaryInterface';
import { prisma } from './prisma';

export async function create({ value, userId, date }: ISalary) {
  const createdSalary = await prisma.salary.create({
    data: {
      value,
      user: { connect: { id: userId } },
      date: new Date(date),
    },
  });

  return createdSalary;
}

export async function readOne({ userId, date }: IQuerySalary) {
  const [year, month, day] = date.split('-');

  const salary = await prisma.salary.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lte: new Date(`${year}-${month}-${day}`),
      },
    },
  });

  return salary;
}
