/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import bcrypt from 'bcryptjs';
import * as service from '../../../services/signInService';
import * as model from '../../../models/signInModel';
import * as data from '../../testData/loginData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test login services', () => {
  describe('Test validate service', () => {
    afterEach(() => { sinon.restore(); });

    it('When the user already exists', async () => {
      sinon.stub(model, 'readOne').resolves(data.createdUserMock);
      try {
        await service.validate(data.user);
      } catch ({ message }) {
        expect(message).to.be.equal('Incorrect email or password.');
      }
    });

    it('When password does not match', async () => {
      sinon.stub(model, 'readOne').resolves(data.createdUserMock);
      sinon.stub(bcrypt, 'compare').resolves(false);

      try {
        await service.validate(data.user);
      } catch ({ message }) {
        expect(message).to.be.equal('Incorrect email or password.');
      }
    });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readOne').resolves(data.createdUserMock);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const token = await service.validate(data.user);

      expect(token).to.be.a('string');
    });
  });
});
