/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { after } from 'mocha';
import app from '../../app';
import { prisma } from '../../models/prisma';
import * as data from '../testData/userData';

chai.use(chaiHttp);

const { expect } = chai;

interface IUser {
  id: number,
  email: string,
  password: string,
  name: string,
}

describe('Integration test user', () => {
  describe('Test user post route', () => {
    after(() => { sinon.restore(); });

    it('When everything goes well should return a token', async () => {
      prisma.user.findUnique = sinon.stub()
        .onFirstCall()
        .resolves(undefined)
        .onSecondCall()
        .resolves(data.createdUserMock as IUser);

      prisma.user.create = sinon.stub().resolves();

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
      prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock as IUser);

      const { status, body: { message } } = await chai
        .request(app)
        .post('/user')
        .send(data.user);

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('User already exist.');
    });
  });
});
