/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import * as model from '../../../models/userModel';
import * as data from '../../testData/userData';
import * as categoryData from '../../testData/categoryData';
import { prisma } from '../../../models/prisma';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test user models', () => {
  describe('Test create method', () => {
    it('When the user is created', async () => {
      prisma.user.create = sinon.stub().resolves(data.createdUserMock);

      const createdUser = await model.create(data.user);
      expect(createdUser).to.be.deep.equal(data.createdUserMock);
    });
  });
  describe('Test readOne method', () => {
    it('When the user is founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock);

      const user = await model.readOne(data.user.email);
      expect(user).to.be.deep.equal(data.createdUserMock);
    });
    it('When the user is not founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(null);

      const user = await model.readOne(data.user.email);
      expect(user).to.be.deep.equal(null);
    });
  });
  describe('Test readOneById method', () => {
    it('When the user is founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock);

      const user = await model.readOneById(1);
      expect(user).to.be.deep.equal(data.createdUserMock);
    });
    it('When the user is not founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(null);

      const user = await model.readOneById(1);
      expect(user).to.be.deep.equal(null);
    });
  });
  describe('Test readCategory method', () => {
    it('When the categories is founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(categoryData.categories);

      const user = await model.readOneById(1);
      expect(user).to.be.deep.equal(categoryData.categories);
    });
    it('When the user is not founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(null);

      const user = await model.readOneById(1);
      expect(user).to.be.deep.equal(null);
    });
  });
});
