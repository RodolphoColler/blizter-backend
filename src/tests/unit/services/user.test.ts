/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import * as service from '../../../services/userService';
import * as model from '../../../models/userModel';
import * as categoryModel from '../../../models/categoryModel';
import * as data from '../../testData/userData';
import * as categoryData from '../../testData/categoryData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test user services', () => {
  describe('Test create service', () => {
    afterEach(() => { sinon.restore(); });

    it('When the user already exists', async () => {
      sinon.stub(model, 'readOne').resolves(data.createdUserMock);
      try {
        await service.create(data.user);
      } catch ({ message }) {
        expect(message).to.be.equal('User already exist.');
      }
    });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readOne').resolves(undefined);
      sinon.stub(model, 'create').resolves(data.createdUserMock);

      const token = await service.create(data.user);

      expect(token).to.be.a('string');
    });
  });
  describe('Test updateCategory service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(categoryModel, 'readById').resolves(categoryData.category);
      sinon.stub(model, 'updateCategory').resolves(data.createdCategoryMock);

      const category = await service.updateCategory(1, 1);

      expect(category).to.be.deep.equal(data.createdCategoryMock);
    });

    it('When the category not exists', async () => {
      sinon.stub(categoryModel, 'readById').resolves(null);

      try {
        await service.updateCategory(1, 1);
      } catch ({ message }) {
        expect(message).to.be.equal('Category not existent.');
      }
    });
  });

  describe('Test readCategory service', () => {
    afterEach(() => { sinon.restore(); });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readOneById').resolves(data.createdUserMock);
      sinon.stub(model, 'readCategory').resolves(categoryData.categories as never);

      const categories = await service.readCategory(1);

      expect(categories).to.be.deep.equal(categoryData.categories);
    });

    it('When the user not exists', async () => {
      sinon.stub(model, 'readOneById').resolves(null);

      try {
        await service.readCategory(1);
      } catch ({ message }) {
        expect(message).to.be.equal('User not exists.');
      }
    });

    it('When the user does not have categories exists', async () => {
      sinon.stub(model, 'readOneById').resolves(data.createdUserMock);
      sinon.stub(model, 'readCategory').resolves(null);

      const categories = await service.readCategory(1);

      expect(categories).to.be.deep.equal({ categories: [] });
    });
  });
});
