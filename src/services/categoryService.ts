import * as model from '../models/categoryModel';

export async function read() {
  const categories = model.read();

  return categories;
}
