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
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../../app"));
const prisma_1 = require("../../models/prisma");
const data = __importStar(require("../testData/categoryData"));
chai_1.default.use(chai_http_1.default);
const { expect } = chai_1.default;
describe('Integration test category', () => {
    describe('Test read get route', () => {
        (0, mocha_1.after)(() => { sinon.restore(); });
        (0, mocha_1.before)(() => { sinon.stub(jsonwebtoken_1.default, 'verify').returns(); });
        const token = 'token';
        it('When everything goes well should return an array of categories', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findMany = sinon.stub().resolves(data.categories);
            const { status, body } = yield chai_1.default
                .request(app_1.default)
                .get('/category')
                .set({ authorization: token });
            expect(status).to.be.equal(200);
            expect(body).to.have.key('categories');
            expect(body.categories).to.be.a('array');
        }));
        it('When database returns an unexpected error', () => __awaiter(void 0, void 0, void 0, function* () {
            prisma_1.prisma.category.findMany = sinon.stub().throws('Inside server error');
            const { status, body: { message } } = yield chai_1.default
                .request(app_1.default)
                .get('/category')
                .set({ authorization: token });
            expect(status).to.be.equal(500);
            expect(message).to.be.equal('Inside server error.');
        }));
    });
});
