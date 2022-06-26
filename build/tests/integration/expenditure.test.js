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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/* eslint-disable no-undef */
const sinon = __importStar(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const app_1 = __importDefault(require("../../app"));
const prisma_1 = require("../../models/prisma");
const data = __importStar(require("../testData/expenditureData"));
const userData = __importStar(require("../testData/userData"));
const categoryData = __importStar(require("../testData/categoryData"));
const jwt_1 = require("../../helpers/jwt");
chai_1.default.use(chai_http_1.default);
const { expect } = chai_1.default;
describe('Integration test expenditure', () => {
    describe('Test expenditure post route', () => {
        (0, mocha_1.after)(() => { sinon.restore(); });
        const token = (0, jwt_1.jwtToken)(1);
        it('When everything goes well should return the new expenditure', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.create = sinon.stub().resolves(data.createdExpenditureMock);
            prisma_1.prisma.category.findUnique = sinon.stub().resolves(categoryData.category);
            // @ts-expect-error
            delete data.createdExpenditureMock.date;
            const { status, body } = yield chai_1.default
                .request(app_1.default)
                .post('/expenditure')
                .send(data.expenditure)
                .set({ authorization: token });
            expect(status).to.be.equal(201);
            expect(body.expenditure).to.be.deep.equal(data.createdExpenditureMock);
        }));
        it('When database returns an unexpected error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findUnique = sinon.stub().throws('Inside server error');
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .post('/expenditure')
                .send(data.expenditure)
                .set({ authorization: token });
            expect(status).to.be.equal(500);
            expect(message).to.be.equal('Inside server error.');
        }));
        it('When service returns an error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findUnique = sinon.stub().resolves(null);
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .post('/expenditure')
                .send(data.expenditure)
                .set({ authorization: token });
            expect(status).to.be.equal(400);
            expect(message).to.be.equal('Category not existent.');
        }));
    });
    describe('Test expenditure get/:id route', () => {
        (0, mocha_1.after)(() => { sinon.restore(); });
        const token = (0, jwt_1.jwtToken)(1);
        it('When everything goes well should return all the expenditures', () => __awaiter(void 0, void 0, void 0, function* () {
            // @ts-expect-error
            delete data.expenditures[0].date;
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(userData.user);
            prisma_1.prisma.category.findUnique = sinon.stub().resolves(categoryData.category);
            prisma_1.prisma.expenditure.findMany = sinon.stub().resolves(data.expenditures);
            const { status, body } = yield chai_1.default
                .request(app_1.default)
                .get('/expenditure/1?date=2022-06-30&category=Pet')
                .set({ authorization: token });
            expect(status).to.be.equal(200);
            expect(body.expenditures).to.be.deep.equal(data.expenditures);
        }));
        it('When database returns an unexpected error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().throws('Inside server error');
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .get('/expenditure/1?date=2022-06-30&category=Pet')
                .set({ authorization: token });
            expect(status).to.be.equal(500);
            expect(message).to.be.equal('Inside server error.');
        }));
        it('When service returns an error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(null);
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .get('/expenditure/1/?date=2022-06-30&category=Pet')
                .set({ authorization: token });
            expect(status).to.be.equal(400);
            expect(message).to.be.equal('User not exists.');
        }));
    });
    describe('Test expenditure delete/:id route', () => {
        (0, mocha_1.after)(() => { sinon.restore(); });
        const token = (0, jwt_1.jwtToken)(1);
        it('When everything goes well should return the deleted expenditure', () => __awaiter(void 0, void 0, void 0, function* () {
            // @ts-expect-error
            delete data.foundedExpenditure.date;
            prisma_1.prisma.expenditure.findUnique = sinon.stub().resolves(data.foundedExpenditure);
            prisma_1.prisma.expenditure.delete = sinon.stub().resolves(data.foundedExpenditure);
            const { status, body } = yield chai_1.default
                .request(app_1.default)
                .delete('/expenditure/1')
                .set({ authorization: token });
            expect(status).to.be.equal(200);
            expect(body.expenditure).to.be.deep.equal(data.foundedExpenditure);
        }));
        it('When database returns an unexpected error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.findUnique = sinon.stub().resolves(data.foundedExpenditure);
            prisma_1.prisma.expenditure.delete = sinon.stub().throws('Inside server error');
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .delete('/expenditure/1')
                .set({ authorization: token });
            expect(status).to.be.equal(500);
            expect(message).to.be.equal('Inside server error.');
        }));
        it('When service returns an error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.findUnique = sinon.stub().resolves(null);
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .delete('/expenditure/1')
                .set({ authorization: token });
            expect(status).to.be.equal(400);
            expect(message).to.be.equal('Expenditure not existent.');
        }));
    });
    describe('Test expenditure get/monthExpend/:id route', () => {
        (0, mocha_1.after)(() => { sinon.restore(); });
        const token = (0, jwt_1.jwtToken)(1);
        it('When everything goes well should return all the expenditures', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(userData.user);
            prisma_1.prisma.expenditure.aggregate = sinon.stub().resolves(data.monthExpenseMock);
            const { status, body } = yield chai_1.default
                .request(app_1.default)
                .get('/expenditure/month/1?date=2022-06-30')
                .set({ authorization: token });
            expect(status).to.be.equal(200);
            expect(body.monthExpense).to.be.deep.equal(data.monthExpenseServiceResponse);
        }));
        it('When database returns an unexpected error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().throws('Inside server error');
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .get('/expenditure/month/1?date=2022-06-30')
                .set({ authorization: token });
            expect(status).to.be.equal(500);
            expect(message).to.be.equal('Inside server error.');
        }));
        it('When service returns an error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(null);
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .get('/expenditure/month/1/?date=2022-06-30')
                .set({ authorization: token });
            expect(status).to.be.equal(400);
            expect(message).to.be.equal('User not exists.');
        }));
    });
});
