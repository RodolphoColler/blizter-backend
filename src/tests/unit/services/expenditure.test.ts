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
});
