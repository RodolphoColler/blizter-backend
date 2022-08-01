import { prisma } from './prisma';

export async function read() {
  const categories = prisma.category.findMany();

  return categories;
}

export async function readOne(id: number) {
  const category = prisma.category.findUnique({ where: { id } });

  return category;
}
