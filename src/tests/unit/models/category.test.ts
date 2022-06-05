/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as model from '../../../models/categoryModel';
import * as data from '../../testData/categoryData';
import { prisma } from '../../../models/prisma';

const { expect } = chai;

describe('Test category models', () => {
  describe('Test read method', () => {
    it('When categories is founded', async () => {
      prisma.category.findMany = sinon.stub().resolves(data.categories);

      const category = await model.read();
      expect(category).to.be.deep.equal(data.categories);
    });
    it('When the category is not founded', async () => {
      prisma.category.findMany = sinon.stub().resolves(undefined);

      const category = await model.read();
      expect(category).to.be.deep.equal(undefined);
    });
  });
});
