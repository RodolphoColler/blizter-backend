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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken_1 = __importDefault(require("../../../middlewares/validateToken"));
chai_1.default.use(chaiHttp);
const { expect } = chai_1.default;
const request = {};
const response = {};
let next = () => { };
describe('Test token middleware', () => {
    describe('When token is invalid', () => {
        before(() => {
            next = sinon.stub();
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.headers = {};
        });
        it('When token is not provided', () => {
            (0, validateToken_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: 'Your request must have a token.' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        it('When token is not valid', () => {
            request.headers.authorization = 'tokenNotValid';
            (0, validateToken_1.default)(request, response, next);
            expect(response.status.calledWith(400)).to.be.equal(true);
            expect(response.json.calledWith({ message: 'Not valid token.' })).to.be.equal(true);
            expect(next.called).to.be.equal(false);
        });
        describe('When token is valid', () => {
            before(() => {
                next = sinon.stub();
                response.status = sinon.stub().returns(response);
                response.json = sinon.stub();
                sinon.stub(jsonwebtoken_1.default, 'verify').returns();
            });
            it('Next function should be called', () => {
                request.headers.authorization = 'tokenValid';
                (0, validateToken_1.default)(request, response, next);
                expect(next.called).to.be.equal(true);
            });
        });
    });
});
