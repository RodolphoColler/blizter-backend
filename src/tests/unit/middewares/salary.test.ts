/* eslint-disable no-undef */
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';
import * as middlewares from '../../../middlewares/validateSalary';

chai.use(chaiHttp);

const { expect } = chai;

const request = {} as Request;
const response = {} as Response;
let next = () => {};

describe('Test salary middleware', () => {
  describe('Test middleware to /post salary', () => {
    describe('When value is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When value is not provided', () => {
        request.body = {};

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When value is a string', () => {
        request.body = { value: 'string' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" must be a number' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When value does not valid', () => {
        request.body = { value: 0 };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" must be greater than or equal to 1' })).to.be.equal(true);
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
        request.body = { value: 1 };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When date does not valid', () => {
        request.body = { value: 1, date: 'DD-YYYY-MM' };

        middlewares.create(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" must be in YYYY-MM-DD format' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });
    });
    describe('When salary is valid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('Next function should be called', () => {
        request.body = { value: 1, date: '2022-12-01' };
        middlewares.create(request, response, next);

        expect((next as sinon.SinonStub).called).to.be.equal(true);
      });
    });
  });
  describe('Test middleware to /patch salary', () => {
    describe('When value is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When value is not provided', () => {
        request.body = {};

        middlewares.updateOne(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When value is a string', () => {
        request.body = { value: 'string' };

        middlewares.updateOne(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" must be a number' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When value does not valid', () => {
        request.body = { value: 0 };

        middlewares.updateOne(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"value" must be greater than or equal to 1' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });
    });
    describe('When salary is valid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('Next function should be called', () => {
        request.body = { value: 1 };
        middlewares.updateOne(request, response, next);

        expect((next as sinon.SinonStub).called).to.be.equal(true);
      });
    });
  });
  describe('Test middleware to /get:id salary', () => {
    describe('When date is invalid', () => {
      before(() => {
        next = sinon.stub();
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
      });

      it('When date is not provided', () => {
        request.query = {};

        middlewares.readOne(request, response, next);

        expect((response.status as sinon.SinonStub).calledWith(400)).to.be.equal(true);
        expect((response.json as sinon.SinonStub).calledWith({ message: '"date" is required' })).to.be.equal(true);
        expect((next as sinon.SinonStub).called).to.be.equal(false);
      });

      it('When date does not valid', () => {
        request.query = { date: 'DD-YYYY-MM' };

        middlewares.readOne(request, response, next);

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
        middlewares.readOne(request, response, next);

        expect((next as sinon.SinonStub).called).to.be.equal(true);
      });
    });
  });
});
