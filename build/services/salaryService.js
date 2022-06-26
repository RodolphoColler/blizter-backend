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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.readOne = exports.create = void 0;
const model = __importStar(require("../models/salaryModel"));
const userModel = __importStar(require("../models/userModel"));
function create(salary) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserExistent = yield userModel.readOneById(salary.userId);
        if (!isUserExistent)
            throw new Error('User not exists.');
        const createdSalary = yield model.create(salary);
        return createdSalary;
    });
}
exports.create = create;
function readOne({ userId, date }) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserExistent = yield userModel.readOneById(userId);
        if (!isUserExistent)
            throw new Error('User not exists.');
        const [salary] = yield model.readOne({ userId, date });
        if (!salary)
            throw new Error('Salary not exists.');
        return salary;
    });
}
exports.readOne = readOne;
function updateOne({ id, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSalaryExistent = yield model.readOneById(id);
        if (!isSalaryExistent)
            throw new Error('Salary not exists.');
        const salary = yield model.updateOne({ id, value });
        return salary;
    });
}
exports.updateOne = updateOne;
