import { IExpenditure, IQueryExpenditure } from '../interfaces/expenditureInterface';
import { prisma } from './prisma';

export async function create({ value, userId, date, categoryId, description }: IExpenditure) {
  const createdExpenditure = await prisma.expenditure.create({
    data: {
      value,
      user: { connect: { id: userId } },
      date: new Date(date),
      description,
      category: { connect: { id: categoryId } },
    },
    include: { category: true },
  });

  return createdExpenditure;
}

export async function read({ userId, date }: IQueryExpenditure) {
  const [year, month, day] = date.split('-');

  const expenditures = await prisma.expenditure.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lte: new Date(`${year}-${month}-${day}`),
      },
    },
    include: { category: true },
  });

  return expenditures;
}

export async function deleteOne(id: number) {
  const expenditure = await prisma.expenditure.delete({ where: { id } });

  return expenditure;
}

export async function readOne(id: number) {
  const deletedExpenditure = await prisma.expenditure.findUnique({ where: { id } });

  return deletedExpenditure;
}

export async function readMonthExpense({ userId, date }: IQueryExpenditure) {
  const [year, month, day] = date.split('-');

  const monthExpense = await prisma.expenditure.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lte: new Date(`${year}-${month}-${day}`),
      },
    },
    _sum: {
      value: true,
    },
  });

  return monthExpense;
}
