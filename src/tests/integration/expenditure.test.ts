/* eslint-disable max-len */
/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../../app';
import { prisma } from '../../models/prisma';
import * as data from '../testData/expenditureData';
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

      expect(status).to.be.equal(404);
      expect(message).to.be.equal('Category not existent.');
    });
  });
  describe('Test expenditure get/:id route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return all the expenditures', async () => {
      // @ts-expect-error
      delete data.expenditures[0].date;
      prisma.expenditure.findMany = sinon.stub().resolves(data.expenditures);

      const { status, body } = await chai
        .request(app)
        .get('/expenditure?date=2022-06-30')
        .set({ authorization: token });

      expect(status).to.be.equal(200);
      expect(body.expenditures).to.be.deep.equal(data.expenditures);
    });

    it('When database returns an unexpected error', async () => {
      prisma.expenditure.findMany = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .get('/expenditure?date=2022-06-30')
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
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

      expect(status).to.be.equal(404);
      expect(message).to.be.equal('Expenditure not existent.');
    });
  });
  describe('Test expenditure get/month route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return all the expenditures', async () => {
      prisma.expenditure.groupBy = sinon.stub().resolves(data.modelMonthExpenseMock);
      prisma.category.findUnique = sinon.stub().resolves(categoryData.category)

      const { status, body } = await chai
        .request(app)
        .get('/expenditure/month?date=2022-06-30')
        .set({ authorization: token });

      expect(status).to.be.equal(200);
      expect(body.monthExpense).to.be.deep.equal(data.monthExpenseServiceResponse);
    });

    it('When database returns an unexpected error', async () => {
      prisma.expenditure.groupBy = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .get('/expenditure/month?date=2022-06-30')
        .set({ authorization: token });

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

  });
});
