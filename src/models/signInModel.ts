import { prisma } from './prisma';

export async function readOne(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
}
