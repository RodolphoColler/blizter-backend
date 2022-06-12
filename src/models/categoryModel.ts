import { prisma } from './prisma';

export async function read() {
  const categories = prisma.category.findMany();

  return categories;
}

export async function readOne(name: string) {
  const categories = prisma.category.findUnique({ where: { name } });

  return categories;
}
