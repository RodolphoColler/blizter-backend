/* eslint-disable max-len */
/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../../app';
import { prisma } from '../../models/prisma';
import * as data from '../testData/salaryData';
import { jwtToken } from '../../helpers/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test salary', () => {
  describe('Test salary post route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return the new salary', async () => {
      // @ts-expect-error
      delete data.salaryMock.date;
      prisma.salary.findMany = sinon.stub().resolves(undefined);
      prisma.salary.create = sinon.stub().resolves(data.salaryMock);

      const { status, body } = await chai
        .request(app)
        .post('/salary')
        .send(data.createSalaryDataIntegration)
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(201);
      expect(body.salary).to.be.deep.equal(data.salaryMock);
    });

    it('When database returns an unexpected error', async () => {
      prisma.salary.findMany = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .post('/salary')
        .send(data.createSalaryDataIntegration)
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When service returns an error', async () => {
      prisma.salary.findMany = sinon.stub().resolves(data.salaryMock);

      const { status, body: { message } } = await chai
        .request(app)
        .post('/salary')
        .send(data.createSalaryDataIntegration)
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(409);
      expect(message).to.be.equal('Salary already exists.');
    });
  });
  describe('Test salary get/ route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return the current salary', async () => {
      // @ts-expect-error
      delete data.salaryArrayMock[0].date;
      prisma.salary.findMany = sinon.stub().resolves(data.salaryArrayMock);

      const { status, body } = await chai
        .request(app)
        .get('/salary?date=2022-06-30')
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(200);
      expect(body.salary).to.be.deep.equal(data.salaryMock);
    });

    it('When database returns an unexpected error', async () => {
      prisma.salary.findMany = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .get('/salary?date=2022-06-30')
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When service returns an error', async () => {
      prisma.salary.findMany = sinon.stub().resolves([]);

      const { status, body: { message } } = await chai
        .request(app)
        .get('/salary?date=2022-06-30')
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(404);
      expect(message).to.be.equal('Salary not exists.');
    });
  });
  describe('Test salary patch/ route', () => {
    after(() => { sinon.restore(); });
    const token = jwtToken(1);

    it('When everything goes well should return the update salary', async () => {
      // @ts-expect-error
      delete data.salaryMock.date;
      prisma.salary.findUnique = sinon.stub().resolves(data.salaryMock);
      prisma.salary.update = sinon.stub().resolves(data.salaryMock);

      const { status, body } = await chai
        .request(app)
        .patch('/salary/1')
        .send(data.updateSalaryData)
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(200);
      expect(body.salary).to.be.deep.equal(data.salaryMock);
    });

    it('When database returns an unexpected error', async () => {
      prisma.salary.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .patch('/salary/1')
        .send(data.updateSalaryData)
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When service returns an error', async () => {
      prisma.salary.findUnique = sinon.stub().resolves(null);

      const { status, body: { message } } = await chai
        .request(app)
        .patch('/salary/1')
        .send(data.updateSalaryData)
        .set('Cookie', `token=${token}`);

      expect(status).to.be.equal(404);
      expect(message).to.be.equal('Salary not exists.');
    });
  });
});
