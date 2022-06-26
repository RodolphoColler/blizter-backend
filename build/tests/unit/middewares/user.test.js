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
const validateUser_1 = __importDefault(require("../../../middlewares/validateUser"));
chai_1.default.use(chaiHttp);
const { expect } = chai_1.default;
const request = {};
const response = {};
let next = () => { };
describe('Test user middleware', () => {
    describe('When email is invalid', () => {
        before(() => {
            next = sinon.stub();
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
        });
        it('When email is not provided', () => {
            request.body = { password: '', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"email" is required' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When email is empty', () => {
            request.body = { email: '', password: '', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"email" is not allowed to be empty' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When email does not is a string', () => {
            request.body = { email: 0, password: '', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"email" must be a string' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When email is not a string', () => {
            request.body = { email: 0, password: '', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"email" must be a string' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When email does not valid', () => {
            request.body = { email: 'teste@.com', password: '', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"email" must be a valid email' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
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
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"password" is required' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When password is empty', () => {
            request.body = { email: 'test@gmail.com', password: '', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"password" is not allowed to be empty' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When password does not is a string', () => {
            request.body = { email: 'test@gmail.com', password: 0, name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"password" must be a string' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When password does not valid', () => {
            request.body = { email: 'teste@gmail.com', password: '123456', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"password" length must be at least 7 characters long' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
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
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When name is empty', () => {
            request.body = { email: 'test@gmail.com', password: '1234567', name: '' };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"name" is not allowed to be empty' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When password does not is a string', () => {
            request.body = { email: 'test@gmail.com', password: '1234567', name: 0 };
            (0, validateUser_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: '"name" must be a string' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
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
            (0, validateUser_1.default)(request, response, next);
            expect(next.called).to.be.equal(true);
        });
    });
});
