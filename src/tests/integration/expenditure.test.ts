/* eslint-disable max-len */
/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../../app';
import { prisma } from '../../models/prisma';
import * as data from '../testData/expenditureData';
import * as userData from '../testData/userData';
import * as categoryData from '../testData/categoryData';
import { jwtToken } from '../../helpers/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test expenditure', () => {
  describe('Test expenditure post route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return the new expenditure', async () => {
      prisma.expenditure.create = sinon.stub().resolves(data.createdExpenditureMock);
      prisma.category.findUnique = sinon.stub().resolves(categoryData.category);
      // @ts-expect-error
      delete data.createdExpenditureMock.date;

      const { status, body } = await chai
        .request(app)
        .post('/expenditure')
        .send(data.expenditure)
        .set({ authorization: token });

      expect(status).to.be.equal(201);
      expect(body.expenditure).to.be.deep.equal(data.createdExpenditureMock);
    });

    it('When database returns an unexpected error', async () => {
      prisma.category.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .post('/expenditure')
        .send(data.expenditure)
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When service returns an error', async () => {
      prisma.category.findUnique = sinon.stub().resolves(null);

      const { status, body: { message } } = await chai
        .request(app)
        .post('/expenditure')
        .send(data.expenditure)
        .set({ authorization: token });

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('Category not existent.');
    });
  });
  describe('Test expenditure get/:id route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return all the expenditures', async () => {
      // @ts-expect-error
      delete data.expenditures[0].date;
      prisma.user.findUnique = sinon.stub().resolves(userData.user);
      prisma.category.findUnique = sinon.stub().resolves(categoryData.category);
      prisma.expenditure.findMany = sinon.stub().resolves(data.expenditures);

      const { status, body } = await chai
        .request(app)
        .get('/expenditure/1?date=2022-06-30&category=Pet')
        .set({ authorization: token });

      expect(status).to.be.equal(200);
      expect(body.expenditures).to.be.deep.equal(data.expenditures);
    });

    it('When database returns an unexpected error', async () => {
      prisma.user.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .get('/expenditure/1?date=2022-06-30&category=Pet')
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When service returns an error', async () => {
      prisma.user.findUnique = sinon.stub().resolves(null);

      const { status, body: { message } } = await chai
        .request(app)
        .get('/expenditure/1/?date=2022-06-30&category=Pet')
        .set({ authorization: token });

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('User not exists.');
    });
  });
  describe('Test expenditure delete/:id route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return the deleted expenditure', async () => {
      // @ts-expect-error
      delete data.foundedExpenditure.date;
      prisma.expenditure.findUnique = sinon.stub().resolves(data.foundedExpenditure);
      prisma.expenditure.delete = sinon.stub().resolves(data.foundedExpenditure);

      const { status, body } = await chai
        .request(app)
        .delete('/expenditure/1')
        .set({ authorization: token });

      expect(status).to.be.equal(200);
      expect(body.expenditure).to.be.deep.equal(data.foundedExpenditure);
    });

    it('When database returns an unexpected error', async () => {
      prisma.expenditure.findUnique = sinon.stub().resolves(data.foundedExpenditure);
      prisma.expenditure.delete = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .delete('/expenditure/1')
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When service returns an error', async () => {
      prisma.expenditure.findUnique = sinon.stub().resolves(null);

      const { status, body: { message } } = await chai
        .request(app)
        .delete('/expenditure/1')
        .set({ authorization: token });

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('Expenditure not existent.');
    });
  });
  describe('Test expenditure get/monthExpend/:id route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return all the expenditures', async () => {
      prisma.user.findUnique = sinon.stub().resolves(userData.user);
      prisma.expenditure.aggregate = sinon.stub().resolves(data.monthExpenseMock);

      const { status, body } = await chai
        .request(app)
        .get('/expenditure/month/1?date=2022-06-30')
        .set({ authorization: token });

      expect(status).to.be.equal(200);
      expect(body.monthExpense).to.be.deep.equal(data.monthExpenseServiceResponse);
    });

    it('When database returns an unexpected error', async () => {
      prisma.user.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .get('/expenditure/month/1?date=2022-06-30')
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When service returns an error', async () => {
      prisma.user.findUnique = sinon.stub().resolves(null);

      const { status, body: { message } } = await chai
        .request(app)
        .get('/expenditure/month/1/?date=2022-06-30')
        .set({ authorization: token });

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('User not exists.');
    });
  });
});
