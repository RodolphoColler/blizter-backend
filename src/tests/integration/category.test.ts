/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../../app';
import { prisma } from '../../models/prisma';
import * as data from '../testData/categoryData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test category', () => {
  describe('Test read get route', () => {
    after(() => { sinon.restore(); });

    it('When everything goes well should return an array of categories', async () => {
      prisma.category.findMany = sinon.stub().resolves(data.categories);

      const { status, body } = await chai
        .request(app)
        .get('/category');

      expect(status).to.be.equal(200);
      expect(body).to.have.key('categories');
      expect(body.categories).to.be.a('array');
    });

    it('When database returns an unexpected error', async () => {
      prisma.category.findMany = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .get('/category');

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });
  });
});
