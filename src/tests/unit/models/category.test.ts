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
  describe('Test readOne method', () => {
    it('When categories is founded', async () => {
      prisma.category.findUnique = sinon.stub().resolves(data.category);

      const category = await model.readOne('category');
      expect(category).to.be.deep.equal(data.category);
    });
    it('When the category is not founded', async () => {
      prisma.category.findUnique = sinon.stub().resolves(undefined);

      const category = await model.readOne('category');
      expect(category).to.be.deep.equal(undefined);
    });
  });

  describe('Test readById method', () => {
    it('When categories is founded', async () => {
      prisma.category.findUnique = sinon.stub().resolves(data.category);

      const category = await model.readById(1);
      expect(category).to.be.deep.equal(data.category);
    });
    it('When the category is not founded', async () => {
      prisma.category.findUnique = sinon.stub().resolves(undefined);

      const category = await model.readById(1);
      expect(category).to.be.deep.equal(undefined);
    });
  });
});
