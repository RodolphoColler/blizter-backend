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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const service = __importStar(require("../../../services/loginService"));
const model = __importStar(require("../../../models/loginModel"));
const data = __importStar(require("../../testData/loginData"));
chai_1.default.use(chaiHttp);
const { expect } = chai_1.default;
describe('Test login services', () => {
    describe('Test validate service', () => {
        afterEach(() => { sinon.restore(); });
        it('When the user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOne').resolves(data.createdUserMock);
            try {
                yield service.validate(data.user);
            }
            catch ({ message }) {
                expect(message).to.be.equal('Incorrect email or password.');
            }
        }));
        it('When password does not match', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOne').resolves(data.createdUserMock);
            sinon.stub(bcryptjs_1.default, 'compare').resolves(false);
            try {
                yield service.validate(data.user);
            }
            catch ({ message }) {
                expect(message).to.be.equal('Incorrect email or password.');
            }
        }));
        it('When everything goes well', () => __awaiter(void 0, void 0, void 0, function* () {
            sinon.stub(model, 'readOne').resolves(data.createdUserMock);
            sinon.stub(bcryptjs_1.default, 'compare').resolves(true);
            const token = yield service.validate(data.user);
            expect(token).to.be.a('string');
        }));
    });
});