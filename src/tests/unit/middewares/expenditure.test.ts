/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import * as middlewares from '../../../middlewares/validateExpenditure';

chai.use(chaiHttp);

const { expect } = chai;

const request = {} as Request;
const response = {} as Response;
let next = () => {};

describe('Test expenditure middleware', () => {
  describe('Test middleware to /post expenditure', () => {
    describe('When value is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When value is not provided', () => {
        request.body = { userId: '', date: '', categoryId: '' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When value is a string', () => {
        request.body = { value: 'string', userId: '', date: '', categoryId: '' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" must be a number' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When value does not valid', () => {
        request.body = { value: 0, userId: '', date: '', categoryId: '' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" must be greater than or equal to 1' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });
    });
    describe('When categoryId is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When categoryId is not provided', () => {
        request.body = { value: 1, userId: 1, date: '2022-12-01' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"categoryId" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When categoryId is a string', () => {
        request.body = { value: 1, userId: 1, date: '2022-12-01', categoryId: 'string' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"categoryId" must be a number' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });
    });
    describe('When description is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When description is not provided', () => {
        request.body = { value: 1, userId: 1, categoryId: 1, date: '2022-12-01' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"description" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When description is empty', () => {
        request.body = { value: 1, userId: 1, categoryId: 1, date: '2022-12-01', description: '' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"description" is not allowed to be empty' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When description is a number', () => {
        request.body = { value: 1, userId: 1, categoryId: 1, date: '2022-12-01', description: 0 };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"description" must be a string' })).to.be.equal(true);
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
        request.body = { value: 1, category: '' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When date does not valid', () => {
        request.body = { value: 1, date: 'DD-YYYY-MM', categoryId: 1 };

        middlewares.create(request, response, next);

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
        request.body = { value: 1, categoryId: 1, date: '2022-12-01', description: 'Description' };
        middlewares.create(request, response, next);

        expect((next as sinon.SinonStub).called).to.be.equal(true);
      });
    });
  });
  describe('Test middleware to /get:id expenditure', () => {
    describe('When date is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When date is not provided', () => {
        request.query = {};

        middlewares.read(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When date does not valid', () => {
        request.query = { date: 'DD-YYYY-MM' };

        middlewares.read(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" must be in YYYY-MM-DD format' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });
    });
    describe('When query is valid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('Next function should be called', () => {
        request.query = { date: '2022-12-01' };
        middlewares.read(request, response, next);

        expect((next as sinon.SinonStub).called).to.be.equal(true);
      });
    });
  });
  describe('Test middleware to /month/:id expenditure', () => {
    describe('When date is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When date is not provided', () => {
        request.query = { };

        middlewares.monthExpense(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When date does not valid', () => {
        request.query = { date: 'DD-YYYY-MM' };

        middlewares.monthExpense(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" must be in YYYY-MM-DD format' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });
    });
    describe('When query is valid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('Next function should be called', () => {
        request.query = { date: '2022-12-01' };
        middlewares.create(request, response, next);

        expect((next as sinon.SinonStub).called).to.be.equal(true);
      });
    });
  });
});
