/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import validateExpenditure from '../../../middlewares/validateExpenditure';

chai.use(chaiHttp);

const { expect } = chai;

const request = {} as Request;
const response = {} as Response;
let next = () => {};

describe('Test expenditure middleware', () => {
  describe('When expenditure is invalid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('When expenditure is not provided', () => {
      request.body = { userId: '', date: '', category: '' };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"expenditure" is required' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When expenditure is a string', () => {
      request.body = { expenditure: 'string', userId: '', date: '', category: '' };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"expenditure" must be a number' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When expenditure does not valid', () => {
      request.body = { expenditure: 0, userId: '', date: '', category: '' };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"expenditure" must be greater than or equal to 1' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });
  });
  describe('When category is invalid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('When category is not provided', () => {
      request.body = { expenditure: 1, userId: 1, date: '2022-12-01' };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"category" is required' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When category is empty', () => {
      request.body = { expenditure: 1, userId: 1, date: '2022-12-01', category: '' };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"category" is not allowed to be empty' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When category is a number', () => {
      request.body = { expenditure: 1, userId: 1, date: '2022-12-01', category: 0 };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"category" must be a string' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });
  });
  describe('When date is invalid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('When date is not provided', () => {
      request.body = { expenditure: 1, category: '' };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"date" is required' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });

    it('When date does not valid', () => {
      request.body = { expenditure: 1, date: 'DD-YYYY-MM', category: '' };

      validateExpenditure(request, response, next);

      expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
      expect((response.json as sinon.SinonStub).calledWith({ message: '"date" must be in YYYY-MM-DD format' })).to.be.equal(true);
      expect((next as sinon.SinonStub).called).to.be.equal(false);
    });
  });
  describe('When expenditure is valid', () => {
    before(() => {
      next = sinon.stub();
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
    });

    it('Next function should be called', () => {
      request.body = { expenditure: 1, category: 'Pet', date: '2022-12-01' };
      validateExpenditure(request, response, next);

      expect((next as sinon.SinonStub).called).to.be.equal(true);
    });
  });
});
