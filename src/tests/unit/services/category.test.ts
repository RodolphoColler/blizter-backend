/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import * as service from '../../../services/categoryService';
import * as model from '../../../models/categoryModel';
import * as data from '../../testData/categoryData';

const { expect } = chai;

describe('Test category services', () => {
  describe('Test read service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'read').resolves(data.categories);
      const categories = await service.read();

      expect(categories).to.be.deep.equal(data.categories);
    });
  });
});
