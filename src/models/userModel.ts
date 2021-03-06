import { prisma } from './prisma';
import { IUser } from '../interfaces/userInterface';

export async function create(user: IUser) {
  const createdUser = await prisma.user.create({ data: user });

  return createdUser;
}

export async function readOne(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
}

export async function readOneById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
}

export async function updateCategory(id: number, categoryId: number) {
  const categories = await prisma.user.update({
    where: { id },
    data: {
      categories: { connect: { id: categoryId } },
    },
    select: { categories: true },
  });

  return categories;
}

export async function readCategory(id: number) {
  const categories = await prisma.user.findUnique({ where: { id }, select: { categories: true } });

  return categories;
}
