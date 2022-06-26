"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const sinon = __importStar(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const chaiHttp = require("chai-http");
const middlewares = __importStar(require("../../../middlewares/validateSalary"));
chai_1.default.use(chaiHttp);
const { expect } = chai_1.default;
const request = {};
const response = {};
let next = () => { };
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
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"value" is required' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
            });
            it('When value is a string', () => {
                request.body = { value: 'string' };
                middlewares.create(request, response, next);
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"value" must be a number' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
            });
            it('When value does not valid', () => {
                request.body = { value: 0 };
                middlewares.create(request, response, next);
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"value" must be greater than or equal to 1' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
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
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"date" is required' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
            });
            it('When date does not valid', () => {
                request.body = { value: 1, date: 'DD-YYYY-MM' };
                middlewares.create(request, response, next);
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"date" must be in YYYY-MM-DD format' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
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
                expect(next.called).to.be.equal(true);
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
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"value" is required' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
            });
            it('When value is a string', () => {
                request.body = { value: 'string' };
                middlewares.updateOne(request, response, next);
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"value" must be a number' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
            });
            it('When value does not valid', () => {
                request.body = { value: 0 };
                middlewares.updateOne(request, response, next);
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"value" must be greater than or equal to 1' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
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
                expect(next.called).to.be.equal(true);
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
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"date" is required' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
            });
            it('When date does not valid', () => {
                request.query = { date: 'DD-YYYY-MM' };
                middlewares.readOne(request, response, next);
                expect(response.status.calledWith(400)).to.be.equal(true);
                expect(response.json.calledWith({ message: '"date" must be in YYYY-MM-DD format' })).to.be.equal(true);
                expect(next.called).to.be.equal(false);
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
                expect(next.called).to.be.equal(true);
            });
        });
    });
});
