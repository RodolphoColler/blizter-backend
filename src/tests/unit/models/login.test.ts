/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import * as model from '../../../models/loginModel';
import * as data from '../../testData/loginData';
import { prisma } from '../../../models/prisma';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test login models', () => {
  describe('Test readOne method', () => {
    it('When the user is founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock);

      const user = await model.readOne(data.user.email);
      expect(user).to.be.deep.equal(data.createdUserMock);
    });
    it('When the user is not founded', async () => {
      prisma.user.findUnique = sinon.stub().resolves(null);

      const user = await model.readOne(data.user.email);
      expect(user).to.be.deep.equal(null);
    });
  });
});
