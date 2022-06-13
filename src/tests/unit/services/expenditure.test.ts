/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as service from '../../../services/expenditureService';
import * as model from '../../../models/expenditureModel';
import * as categoryModel from '../../../models/categoryModel';
import * as userModel from '../../../models/userModel';
import * as data from '../../testData/expenditureData';
import * as categoryData from '../../testData/categoryData';
import * as userData from '../../testData/userData';

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
      sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
      sinon.stub(categoryModel, 'readOne').resolves(categoryData.category);
      sinon.stub(model, 'read').resolves(data.expenditures);

      const expenditure = await service.read(data.queryExpenditure);

      expect(expenditure).to.be.deep.equal(data.expenditures);
    });

    it('When the category not exist in database', async () => {
      sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
      sinon.stub(categoryModel, 'readOne').resolves(null);

      try {
        await service.read(data.queryExpenditure);
      } catch ({ message }) {
        expect(message).to.be.equal('Category not existent.');
      }
    });

    it('When the user not exist in database', async () => {
      sinon.stub(userModel, 'readOneById').resolves(null);

      try {
        await service.read(data.queryExpenditure);
      } catch ({ message }) {
        expect(message).to.be.equal('User not exists.');
      }
    });
  });
});
