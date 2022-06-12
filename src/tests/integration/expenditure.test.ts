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
      prisma.expenditure.create = sinon.stub().throws('Inside server error');

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

      console.log(message);

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('Category not existent.');
    });
  });
});
