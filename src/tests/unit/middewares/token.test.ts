/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import validateToken from '../../../middlewares/validateToken';

chai.use(chaiHttp);

const { expect } = chai;

const request = {} as Request;
const response = {} as Response;
let next = () => {};

describe.only('Test token middleware', () => {
  describe('When token is invalid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
      request.headers = {};
    });

    it('When token is not provided', () => {
      validateToken(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: 'Your request must have a token.' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When token is not valid', () => {
      request.headers.authorization = 'tokenNotValid';
      validateToken(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: 'Not valid token.' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    describe('When token is valid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
        sinon.stub(jwt, 'verify').returns();
      });

      it('Next function should be called', () => {
        request.headers.authorization = 'tokenValid';
        validateToken(request, response, next);

        expect((next as sinon.SinonStub).called).to.be.equal(true);
      });
    });
  });
});
