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
const model = __importStar(require("../../../models/salaryModel"));
const data = __importStar(require("../../testData/salaryData"));
const prisma_1 = require("../../../models/prisma");
const { expect } = chai_1.default;
describe('Test salary models', () => {
    describe('Test create method', () => {
        it('When salary is created', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.create = sinon.stub().resolves(data.salaryMock);
            const salary = yield model.create(data.createSalaryData);
            expect(salary).to.be.deep.equal(data.salaryMock);
        }));
        it('When the an error is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.create = sinon.stub().throws(new Error('error'));
            try {
                yield model.create(data.createSalaryData);
            }
            catch ({ message }) {
                expect(message).to.be.deep.equal('error');
            }
        }));
    });
    describe('Test readOne method', () => {
        it('When salary is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.findMany = sinon.stub().resolves(data.salaryMock);
            const salary = yield model.readOne(data.createSalaryData);
            expect(salary).to.be.deep.equal(data.salaryMock);
        }));
        it('When the undefined is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.findMany = sinon.stub().resolves(undefined);
            const salary = yield model.readOne(data.createSalaryData);
            expect(salary).to.be.deep.equal(undefined);
        }));
    });
    describe('Test readOneById method', () => {
        it('When salary is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.findUnique = sinon.stub().resolves(data.salaryMock);
            const salary = yield model.readOneById(1);
            expect(salary).to.be.deep.equal(data.salaryMock);
        }));
        it('When the undefined is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.findUnique = sinon.stub().resolves(undefined);
            const salary = yield model.readOneById(1);
            expect(salary).to.be.deep.equal(undefined);
        }));
    });
    describe('Test updateOne method', () => {
        it('When salary is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.update = sinon.stub().resolves(data.salaryMock);
            const salary = yield model.updateOne(data.updateSalaryData);
            expect(salary).to.be.deep.equal(data.salaryMock);
        }));
        it('When the undefined is returned', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.salary.update = sinon.stub().resolves(undefined);
            const salary = yield model.updateOne(data.updateSalaryData);
            expect(salary).to.be.deep.equal(undefined);
        }));
    });
});
