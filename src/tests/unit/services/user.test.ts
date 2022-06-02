/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import * as service from '../../../services/userService';
import * as model from '../../../models/userModel';
import * as data from '../../testData/userData';

chai.use(chaiHttp);

const { expect } = chai;

interface IUser {
  id: number,
  email: string,
  password: string,
  name: string,
}

describe('Test user services', () => {
  describe('Test create service', () => {
    afterEach(() => { sinon.restore(); });

    it('When the user already exists', async () => {
      sinon.stub(model, 'readOne').resolves(data.createdUserMock as IUser);
      try {
        await service.create(data.user);
      } catch ({ message }) {
        expect(message).to.be.equal('User already exist.');
      }
    });

    it('When user is not created', async () => {
      sinon.stub(model, 'readOne').resolves(undefined);
      sinon.stub(model, 'create').resolves();

      try {
        await service.create(data.user);
      } catch ({ message }) {
        expect(message).to.be.equal('It\'s not possible crete your user.');
      }
    });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readOne')
        .onFirstCall()
        .resolves(undefined)
        .onSecondCall()
        .resolves(data.createdUserMock as IUser);
      sinon.stub(model, 'create').resolves();

      const token = await service.create(data.user);

      expect(token).to.be.a('string');
    });
  });
});
