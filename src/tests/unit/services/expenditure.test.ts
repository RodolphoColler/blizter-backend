/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as service from '../../../services/expenditureService';
import * as model from '../../../models/expenditureModel';
import * as categoryModel from '../../../models/categoryModel';
import * as data from '../../testData/expenditureData';
import * as categoryData from '../../testData/categoryData';

const { expect } = chai;

describe('Test expenditure services', () => {
  describe('Test create service', () => {
    afterEach(() => { sinon.restore(); });
    it('When everything goes well', async () => {
      sinon.stub(categoryModel, 'readOne').resolves(categoryData.category);
      sinon.stub(model, 'create').resolves(data.createdExpenditureMock);

      const expenditure = await service.create(data.expenditure);

      expect(expenditure).to.be.deep.equal(data.createdExpenditureMock);
    });
    it('When the category not exist in database', async () => {
      sinon.stub(categoryModel, 'readOne').resolves(null);

      try {
        await service.create(data.expenditure);
      } catch ({ message }) {
        expect(message).to.be.equal('Category not existent.');
      }
    });
  });
  describe('Test read service', () => {
    afterEach(() => { sinon.restore(); });
    it('When everything goes well', async () => {
      sinon.stub(model, 'read').resolves(data.expenditures);

      const expenditure = await service.read(data.queryExpenditure);

      expect(expenditure).to.be.deep.equal(data.expenditures);
    });

  });
  describe('Test deleteOne service', () => {
    afterEach(() => { sinon.restore(); });
    it('When everything goes well', async () => {
      sinon.stub(model, 'readOne').resolves(data.foundedExpenditure);
      sinon.stub(model, 'deleteOne').resolves(data.foundedExpenditure);

      const expenditure = await service.deleteOne(1);

      expect(expenditure).to.be.deep.equal(data.foundedExpenditure);
    });

    it('When the expenditure not exist in database', async () => {
      sinon.stub(model, 'readOne').resolves(undefined);

      try {
        await service.deleteOne(1);
      } catch ({ message }) {
        expect(message).to.be.equal('Expenditure not existent.');
      }
    });
  });
  describe('Test readMonthExpense service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readMonthExpense').resolves(data.modelMonthExpenseMock);
      sinon.stub(categoryModel, 'readOne').resolves(categoryData.category);

      const monthExpense = await service.readMonthExpense(data.queryMonthExpenditure);

      expect(monthExpense).to.be.deep.equal(data.monthExpenseServiceResponse);
    });

    it('When database returns an empty array', async () => {
      sinon.stub(model, 'readMonthExpense').resolves([]);

      const monthExpense = await service.readMonthExpense(data.queryMonthExpenditure);

      expect(monthExpense).to.be.deep.equal([]);
    });
  });
});
