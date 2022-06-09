/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as service from '../../../services/expenditureService';
import * as model from '../../../models/expenditureModel';
import * as data from '../../testData/expenditureData';

const { expect } = chai;

describe('Test expenditure services', () => {
  describe('Test create service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'create').resolves(data.createdExpenditureMock);

      const expenditure = await service.create(data.expenditure);

      expect(expenditure).to.be.deep.equal(data.createdExpenditureMock);
    });
  });
});
