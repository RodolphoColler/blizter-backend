/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as model from '../../../models/expenditureModel';
import * as data from '../../testData/expenditureData';
import { prisma } from '../../../models/prisma';

const { expect } = chai;

describe('Test expenditure models', () => {
  describe('Test create method', () => {
    it('When expenditure is created', async () => {
      prisma.expenditure.create = sinon.stub().resolves(data.createdExpenditureMock);

      const expenditure = await model.create(data.expenditure);
      expect(expenditure).to.be.deep.equal(data.createdExpenditureMock);
    });
    it('When the an error is returned', async () => {
      prisma.expenditure.create = sinon.stub().throws(new Error('error'));
      try {
        await model.create(data.expenditure);
      } catch ({ message }) {
        expect(message).to.be.deep.equal('error');
      }
    });
  });
  describe('Test read method', () => {
    it('When expenditure is returned', async () => {
      prisma.expenditure.findMany = sinon.stub().resolves(data.expenditures);

      const expenditure = await model.read(data.queryExpenditure);
      expect(expenditure).to.be.deep.equal(data.expenditures);
    });
    it('When the an error is returned', async () => {
      prisma.expenditure.findMany = sinon.stub().throws(new Error('error'));
      try {
        await model.read(data.queryExpenditure);
      } catch ({ message }) {
        expect(message).to.be.deep.equal('error');
      }
    });
  });
  describe('Test readOne method', () => {
    it('When expenditure is returned', async () => {
      prisma.expenditure.findUnique = sinon.stub().resolves(data.foundedExpenditure);

      const expenditure = await model.readOne(1);
      expect(expenditure).to.be.deep.equal(data.foundedExpenditure);
    });
    it('When the an error is returned', async () => {
      prisma.expenditure.findUnique = sinon.stub().throws(new Error('error'));
      try {
        await model.readOne(1);
      } catch ({ message }) {
        expect(message).to.be.deep.equal('error');
      }
    });
  });
  describe('Test deleteOne method', () => {
    it('When expenditure is returned', async () => {
      prisma.expenditure.delete = sinon.stub().resolves(data.foundedExpenditure);

      const expenditure = await model.deleteOne(1);
      expect(expenditure).to.be.deep.equal(data.foundedExpenditure);
    });
    it('When the an error is returned', async () => {
      prisma.expenditure.delete = sinon.stub().throws(new Error('error'));
      try {
        await model.deleteOne(1);
      } catch ({ message }) {
        expect(message).to.be.deep.equal('error');
      }
    });
  });
});
