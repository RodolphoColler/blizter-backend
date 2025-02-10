import prisma from './prisma';
import { ISocialUser, IUser } from '../interfaces/userInterface';

export async function create(user: IUser) {
  const createdUser = await prisma.user.create({ data: user });

  return createdUser;
}

export async function createSocial(user: ISocialUser) {
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
