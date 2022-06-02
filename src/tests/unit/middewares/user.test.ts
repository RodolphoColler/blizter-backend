/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import validateUser from '../../../middlewares/validateUser';

chai.use(chaiHttp);

const { expect } = chai;

const request = {} as Request;
const response = {} as Response;
let next = () => {};

describe('Test user middleware', () => {
  describe('When email is invalid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('When email is not provided', () => {
      request.body = { password: '', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"email" is required' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When email is empty', () => {
      request.body = { email: '', password: '', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"email" is not allowed to be empty' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When email does not is a string', () => {
      request.body = { email: 0, password: '', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"email" must be a string' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When email is not a string', () => {
      request.body = { email: 0, password: '', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"email" must be a string' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When email does not valid', () => {
      request.body = { email: 'teste@.com', password: '', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"email" must be a valid email' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });
  });
  describe('When password is invalid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('When password is not provided', () => {
      request.body = { email: 'test@gmail.com', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"password" is required' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When password is empty', () => {
      request.body = { email: 'test@gmail.com', password: '', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"password" is not allowed to be empty' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When password does not is a string', () => {
      request.body = { email: 'test@gmail.com', password: 0, name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"password" must be a string' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When password does not valid', () => {
      request.body = { email: 'teste@gmail.com', password: '123456', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"password" length must be at least 7 characters long' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });
  });
  describe('When name is invalid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('When name is not provided', () => {
      request.body = { email: 'test@gmail.com', password: '1234567' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"name" is required' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When name is empty', () => {
      request.body = { email: 'test@gmail.com', password: '1234567', name: '' };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"name" is not allowed to be empty' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When password does not is a string', () => {
      request.body = { email: 'test@gmail.com', password: '1234567', name: 0 };

      validateUser(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"name" must be a string' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });
  });
  describe('When everything goes well', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('when next function is called', () => {
      request.body = { email: 'test@gmail.com', password: '1234567', name: 'name' };

      validateUser(request, response, next);

      expect((next as sinon.SinonStub).called).to.be.equal(true);
    });
  });
});
