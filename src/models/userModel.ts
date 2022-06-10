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

export async function updateCategory(id: number, categoryId: number) {
  const { categories } = await prisma.user.update({
    where: { id },
    data: {
      categories: { set: { id: categoryId } },
    },
    select: { categories: true },
  });

  return categories[0];
}
