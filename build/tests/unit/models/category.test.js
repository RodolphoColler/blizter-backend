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
const model = __importStar(require("../../../models/categoryModel"));
const data = __importStar(require("../../testData/categoryData"));
const prisma_1 = require("../../../models/prisma");
const { expect } = chai_1.default;
describe('Test category models', () => {
    describe('Test read method', () => {
        it('When categories is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findMany = sinon.stub().resolves(data.categories);
            const category = yield model.read();
            expect(category).to.be.deep.equal(data.categories);
        }));
        it('When the category is not founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findMany = sinon.stub().resolves(undefined);
            const category = yield model.read();
            expect(category).to.be.deep.equal(undefined);
        }));
    });
    describe('Test readOne method', () => {
        it('When categories is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findUnique = sinon.stub().resolves(data.category);
            const category = yield model.readOne('category');
            expect(category).to.be.deep.equal(data.category);
        }));
        it('When the category is not founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findUnique = sinon.stub().resolves(undefined);
            const category = yield model.readOne('category');
            expect(category).to.be.deep.equal(undefined);
        }));
    });
    describe('Test readById method', () => {
        it('When categories is founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findUnique = sinon.stub().resolves(data.category);
            const category = yield model.readById(1);
            expect(category).to.be.deep.equal(data.category);
        }));
        it('When the category is not founded', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findUnique = sinon.stub().resolves(undefined);
            const category = yield model.readById(1);
            expect(category).to.be.deep.equal(undefined);
        }));
    });
});
