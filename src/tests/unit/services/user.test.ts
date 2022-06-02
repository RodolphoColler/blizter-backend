/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import * as service from '../../../services/userService';
import * as model from '../../../models/userModel';
import * as data from '../../testData/userData';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test user services', () => {
  describe('Test create service', () => {
    afterEach(() => { sinon.restore(); });

    it('When the user already exists', async () => {
      sinon.stub(model, 'readOne').resolves(data.createdUserMock);
      try {
        await service.create(data.user);
      } catch ({ message }) {
        expect(message).to.be.equal('User already exist.');
      }
    });

    it('When everything goes well', async () => {
      sinon.stub(model, 'readOne').resolves(undefined);
      sinon.stub(model, 'create').resolves(data.createdUserMock);

      const token = await service.create(data.user);

      expect(token).to.be.a('string');
    });
  });
});
