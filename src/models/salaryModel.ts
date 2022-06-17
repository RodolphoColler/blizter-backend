import { ISalary } from '../interfaces/salaryInterface';
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
