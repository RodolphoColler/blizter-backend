import { prisma } from './prisma';

export async function read() {
  const categories = prisma.category.findMany();

  return categories;
}

export async function readOne(name: string) {
  const category = prisma.category.findUnique({ where: { name } });

  return category;
}

export async function readById(id: number) {
  const category = prisma.category.findUnique({ where: { id } });

  return category;
}
