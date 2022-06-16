import { IExpenditure, IQueryExpenditure } from '../interfaces/expenditureInterface';
import { prisma } from './prisma';

export async function create({ value, userId, date, category, description }: IExpenditure) {
  const createdExpenditure = await prisma.expenditure.create({
    data: {
      value,
      user: { connect: { id: userId } },
      date: new Date(date),
      category,
      description,
    },
  });

  return createdExpenditure;
}

export async function read({ id, category, date }: IQueryExpenditure) {
  const [year, month, day] = date.split('-');

  const expenditures = await prisma.expenditure.findMany({
    where: {
      userId: id,
      category,
      date: {
        gte: new Date(`${year}-${month}-01`),
        lte: new Date(`${year}-${month}-${day}`),
      },
    },
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
