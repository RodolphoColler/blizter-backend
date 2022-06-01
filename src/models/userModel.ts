import { prisma } from './prisma';
import { IUser } from '../interfaces/userInterface';

export async function create(user: IUser) {
  const createdUser = await prisma.user.create({ data: user });

  return createdUser;
}

export async function readOne(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true },
  });

  return user;
}
