/* eslint-disable newline-per-chained-call */
/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../../app';
import { prisma } from '../../models/prisma';
import * as data from '../testData/userData';
import * as categoryData from '../testData/categoryData';
import { jwtToken } from '../../helpers/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test user', () => {
  describe('Test user post route', () => {
    after(() => { sinon.restore(); });

    it('When everything goes well should return a token', async () => {
      prisma.user.findUnique = sinon.stub().resolves(undefined);

      prisma.user.create = sinon.stub().resolves(data.createdUserMock);

      const { status, body } = await chai
        .request(app)
        .post('/user')
        .send(data.user);

      expect(status).to.be.equal(201);
      expect(body).to.have.key('token');
      expect(body.token).to.be.a('string');
    });

    it('When database returns an unexpected error', async () => {
      prisma.user.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .post('/user')
        .send(data.user);

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When services returns an error', async () => {
      prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock);

      const { status, body: { message } } = await chai
        .request(app)
        .post('/user')
        .send(data.user);

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('User already exist.');
    });
  });
  describe('Test patch /user/category route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);
    const category = { categoryId: 1 };

    it('When everything goes well should the added category', async () => {
      prisma.category.findUnique = sinon.stub().resolves(data.createdCategoryMock);

      prisma.user.update = sinon.stub().resolves(data.createdCategoryDbMock);

      const { status, body } = await chai
        .request(app)
        .patch('/user/category/1')
        .send(category)
        .set({ authorization: token });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(data.createdCategoryDbMock);
    });

    it('When database returns an unexpected error', async () => {
      prisma.category.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .patch('/user/category/1')
        .send(category)
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When services returns an error', async () => {
      prisma.category.findUnique = sinon.stub().resolves(null);

      const { status, body: { message } } = await chai
        .request(app)
        .patch('/user/category/1')
        .send(category)
        .set({ authorization: token });

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('Category not existent.');
    });
  });
  describe('Test get /user/category route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return all categories', async () => {
      prisma.user.findUnique = sinon.stub()
        .onFirstCall().resolves(data.createdUserMock)
        .onSecondCall().resolves(categoryData.categories);

      const { status, body } = await chai
        .request(app)
        .get('/user/category/1')
        .set({ authorization: token });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(categoryData.categories);
    });

    it('When database returns an unexpected error', async () => {
      prisma.user.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .get('/user/category/1')
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When services returns an error', async () => {
      prisma.user.findUnique = sinon.stub().resolves(null);

      const { status, body: { message } } = await chai
        .request(app)
        .get('/user/category/1')
        .set({ authorization: token });

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('User not exists.');
    });
  });
});
