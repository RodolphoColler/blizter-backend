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
const chaiHttp = require("chai-http");
const model = __importStar(require("../../../models/userModel"));
const data = __importStar(require("../../testData/userData"));
const categoryData = __importStar(require("../../testData/categoryData"));
const prisma_1 = require("../../../models/prisma");
chai_1.default.use(chaiHttp);
const { expect } = chai_1.default;
describe('Test user models', () => {
    describe('Test create method', () => {
        it('When the user is created', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.create = sinon.stub().resolves(data.createdUserMock);
            const createdUser = yield model.create(data.user);
            expect(createdUser).to.be.deep.equal(data.createdUserMock);
        }));
    });
    describe('Test updateCategory method', () => {
        it('When the user category is updated', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.update = sinon.stub().resolves(data.createdCategoryDbMock);
            const createdCategory = yield model.updateCategory(1, 1);
            expect(createdCategory).to.be.deep.equal(data.createdCategoryDbMock);
        }));
        it('When the user category is not updated', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.update = sinon.stub().resolves(null);
            const createdCategory = yield model.updateCategory(1, 1);
            expect(createdCategory).to.be.deep.equal(null);
        }));
    });
    describe('Test readOne method', () => {
        it('When the user is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock);
            const user = yield model.readOne(data.user.email);
            expect(user).to.be.deep.equal(data.createdUserMock);
        }));
        it('When the user is not founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(null);
            const user = yield model.readOne(data.user.email);
            expect(user).to.be.deep.equal(null);
        }));
    });
    describe('Test readOneById method', () => {
        it('When the user is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(data.createdUserMock);
            const user = yield model.readOneById(1);
            expect(user).to.be.deep.equal(data.createdUserMock);
        }));
        it('When the user is not founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(null);
            const user = yield model.readOneById(1);
            expect(user).to.be.deep.equal(null);
        }));
    });
    describe('Test readCategory method', () => {
        it('When the categories is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(categoryData.categories);
            const user = yield model.readOneById(1);
            expect(user).to.be.deep.equal(categoryData.categories);
        }));
        it('When the user is not founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.user.findUnique = sinon.stub().resolves(null);
            const user = yield model.readOneById(1);
            expect(user).to.be.deep.equal(null);
        }));
    });
});
