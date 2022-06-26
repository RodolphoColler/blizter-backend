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
const service = __importStar(require("../../../services/userService"));
const model = __importStar(require("../../../models/userModel"));
const categoryModel = __importStar(require("../../../models/categoryModel"));
const data = __importStar(require("../../testData/userData"));
const categoryData = __importStar(require("../../testData/categoryData"));
chai_1.default.use(chaiHttp);
const { expect } = chai_1.default;
describe('Test user services', () => {
    describe('Test create service', () => {
        afterEach(() => { sinon.restore(); });
        it('When the user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOne').resolves(data.createdUserMock);
            try {
                yield service.create(data.user);
            }
            catch ({ message }) {
                expect(message).to.be.equal('User already exist.');
            }
        }));
        it('When everything goes well', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOne').resolves(undefined);
            sinon.stub(model, 'create').resolves(data.createdUserMock);
            const token = yield service.create(data.user);
            expect(token).to.be.a('string');
        }));
    });
    describe('Test updateCategory service', () => {
        afterEach(() => { sinon.restore(); });
        it('When everything goes well', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(categoryModel, 'readById').resolves(categoryData.category);
            sinon.stub(model, 'updateCategory').resolves(data.createdCategoryDbMock);
            const category = yield service.updateCategory(1, 1);
            expect(category).to.be.deep.equal(data.createdCategoryDbMock);
        }));
        it('When the category not exists', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(categoryModel, 'readById').resolves(null);
            try {
                yield service.updateCategory(1, 1);
            }
            catch ({ message }) {
                expect(message).to.be.equal('Category not existent.');
            }
        }));
    });
    describe('Test readCategory service', () => {
        afterEach(() => { sinon.restore(); });
        it('When everything goes well', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOneById').resolves(data.createdUserMock);
            sinon.stub(model, 'readCategory').resolves(categoryData.categories);
            const categories = yield service.readCategory(1);
            expect(categories).to.be.deep.equal(categoryData.categories);
        }));
        it('When the user not exists', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOneById').resolves(null);
            try {
                yield service.readCategory(1);
            }
            catch ({ message }) {
                expect(message).to.be.equal('User not exists.');
            }
        }));
        it('When the user does not have categories exists', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOneById').resolves(data.createdUserMock);
            sinon.stub(model, 'readCategory').resolves(null);
            const categories = yield service.readCategory(1);
            expect(categories).to.be.deep.equal({ categories: [] });
        }));
    });
});
