/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as model from '../../../models/salaryModel';
import * as data from '../../testData/salaryData';
import { prisma } from '../../../models/prisma';

const { expect } = chai;

describe('Test salary models', () => {
  describe('Test create method', () => {
    it('When salary is created', async () => {
      prisma.salary.create = sinon.stub().resolves(data.salaryMock);

      const salary = await model.create(data.createSalaryData);
      expect(salary).to.be.deep.equal(data.salaryMock);
    });
    it('When the an error is returned', async () => {
      prisma.salary.create = sinon.stub().throws(new Error('error'));

      try {
        await model.create(data.createSalaryData);
      } catch ({ message }) {
        expect(message).to.be.deep.equal('error');
      }
    });
  });
});
