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
/* eslint-disable no-undef */
const sinon = __importStar(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const model = __importStar(require("../../../models/expenditureModel"));
const data = __importStar(require("../../testData/expenditureData"));
const prisma_1 = require("../../../models/prisma");
const { expect } = chai_1.default;
describe('Test expenditure models', () => {
    describe('Test create method', () => {
        it('When expenditure is created', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.create = sinon.stub().resolves(data.createdExpenditureMock);
            const expenditure = yield model.create(data.expenditure);
            expect(expenditure).to.be.deep.equal(data.createdExpenditureMock);
        }));
        it('When the an error is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.create = sinon.stub().throws(new Error('error'));
            try {
                yield model.create(data.expenditure);
            }
            catch ({ message }) {
                expect(message).to.be.deep.equal('error');
            }
        }));
    });
    describe('Test read method', () => {
        it('When expenditure is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.findMany = sinon.stub().resolves(data.expenditures);
            const expenditure = yield model.read(data.queryExpenditure);
            expect(expenditure).to.be.deep.equal(data.expenditures);
        }));
        it('When the an error is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.findMany = sinon.stub().throws(new Error('error'));
            try {
                yield model.read(data.queryExpenditure);
            }
            catch ({ message }) {
                expect(message).to.be.deep.equal('error');
            }
        }));
    });
    describe('Test readMonthExpense method', () => {
        it('When expense is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.aggregate = sinon.stub().resolves(data.monthExpenseMock);
            const expenditure = yield model.readMonthExpense(data.queryMonthExpenditure);
            expect(expenditure).to.be.deep.equal(data.monthExpenseMock);
        }));
        it('When the an error is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.aggregate = sinon.stub().throws(new Error('error'));
            try {
                yield model.readMonthExpense(data.queryMonthExpenditure);
            }
            catch ({ message }) {
                expect(message).to.be.deep.equal('error');
            }
        }));
    });
    describe('Test readOne method', () => {
        it('When expenditure is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.findUnique = sinon.stub().resolves(data.foundedExpenditure);
            const expenditure = yield model.readOne(1);
            expect(expenditure).to.be.deep.equal(data.foundedExpenditure);
        }));
        it('When the an error is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.findUnique = sinon.stub().throws(new Error('error'));
            try {
                yield model.readOne(1);
            }
            catch ({ message }) {
                expect(message).to.be.deep.equal('error');
            }
        }));
    });
    describe('Test deleteOne method', () => {
        it('When expenditure is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.delete = sinon.stub().resolves(data.foundedExpenditure);
            const expenditure = yield model.deleteOne(1);
            expect(expenditure).to.be.deep.equal(data.foundedExpenditure);
        }));
        it('When the an error is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.expenditure.delete = sinon.stub().throws(new Error('error'));
            try {
                yield model.deleteOne(1);
            }
            catch ({ message }) {
                expect(message).to.be.deep.equal('error');
            }
        }));
    });
});
