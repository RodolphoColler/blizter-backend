import { prisma } from './prisma';

export async function read() {
  const categories = prisma.category.findMany();

  return categories;
}
