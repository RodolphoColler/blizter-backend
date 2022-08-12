/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import bcrypt from 'bcryptjs';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../../app';
import { prisma } from '../../models/prisma';
import * as data from '../testData/loginData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integration test login', () => {
  describe('Test login post route', () => {
    after(() => { sinon.restore(); });

    it('When everything goes well send a cookie', async () => {
      prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const { status } = await chai
        .request(app)
        .post('/login')
        .send(data.user);

      expect(status).to.be.equal(204);
    });

    it('When database returns an unexpected error', async () => {
      prisma.user.findUnique = sinon.stub().throws('Inside server error');

      const { status, body: { message } } = await chai
        .request(app)
        .post('/login')
        .send(data.user);

      expect(status).to.be.equal(500);
      expect(message).to.be.equal('Inside server error.');
    });

    it('When services returns an error', async () => {
      prisma.user.findUnique = sinon.stub().resolves(undefined);

      const { status, body: { message } } = await chai
        .request(app)
        .post('/login')
        .send(data.user);

      expect(status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password.');
    });
  });
});
