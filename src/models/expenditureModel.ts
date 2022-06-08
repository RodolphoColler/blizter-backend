import { IExpenditure } from '../interfaces/expenditureInterface';
import { prisma } from './prisma';

export async function create({ expenditure, userId, date, category }: IExpenditure) {
  const createdExpenditure = prisma.expenditure.create({
    data: {
      expenditure,
      user: { connect: { id: userId } },
      date: new Date(date),
      category,
    },
  });

  return createdExpenditure;
}
