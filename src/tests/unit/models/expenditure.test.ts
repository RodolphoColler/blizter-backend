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
});
