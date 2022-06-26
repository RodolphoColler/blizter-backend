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
const service = __importStar(require("../../../services/salaryService"));
const model = __importStar(require("../../../models/salaryModel"));
const userModel = __importStar(require("../../../models/userModel"));
const data = __importStar(require("../../testData/salaryData"));
const userData = __importStar(require("../../testData/userData"));
const { expect } = chai_1.default;
describe('Test salary services', () => {
    describe('Test create service', () => {
        afterEach(() => { sinon.restore(); });
        it('When everything goes well', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
            sinon.stub(model, 'create').resolves(data.salaryMock);
            const salary = yield service.create(data.createSalaryData);
            expect(salary).to.be.deep.equal(data.salaryMock);
        }));
        it('When the user not exist in database', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(userModel, 'readOneById').resolves(null);
            try {
                yield service.create(data.createSalaryData);
            }
            catch ({ message }) {
                expect(message).to.be.equal('User not exists.');
            }
        }));
    });
    describe('Test readOne service', () => {
        afterEach(() => { sinon.restore(); });
        it('When everything goes well', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
            sinon.stub(model, 'readOne').resolves(data.salaryArrayMock);
            const salary = yield service.readOne(data.querySalary);
            expect(salary).to.be.deep.equal(data.salaryArrayMock[0]);
        }));
        it('When the user not exist in database', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(userModel, 'readOneById').resolves(null);
            try {
                yield service.readOne(data.querySalary);
            }
            catch ({ message }) {
                expect(message).to.be.equal('User not exists.');
            }
        }));
        it('When salary is not founded', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(userModel, 'readOneById').resolves(userData.createdUserMock);
            sinon.stub(model, 'readOne').resolves([]);
            try {
                yield service.readOne(data.querySalary);
            }
            catch ({ message }) {
                expect(message).to.be.equal('Salary not exists.');
            }
        }));
    });
    describe('Test updateOne service', () => {
        afterEach(() => { sinon.restore(); });
        it('When everything goes well', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOneById').resolves(data.salaryMock);
            sinon.stub(model, 'updateOne').resolves(data.salaryMock);
            const salary = yield service.updateOne(data.updateSalaryData);
            expect(salary).to.be.deep.equal(data.salaryMock);
        }));
        it('When the user not exist in database', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOneById').resolves(null);
            try {
                yield service.updateOne(data.updateSalaryData);
            }
            catch ({ message }) {
                expect(message).to.be.equal('Salary not exists.');
            }
        }));
    });
});
