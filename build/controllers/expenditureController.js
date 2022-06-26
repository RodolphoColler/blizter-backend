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
exports.readMonthExpense = exports.read = exports.deleteOne = exports.create = void 0;
const service = __importStar(require("../services/expenditureService"));
var errors;
(function (errors) {
    errors[errors["Category not existent."] = 400] = "Category not existent.";
    errors[errors["User not exists."] = 400] = "User not exists.";
    errors[errors["Expenditure not existent."] = 400] = "Expenditure not existent.";
})(errors || (errors = {}));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { value, date, category, description } = req.body;
            const { id: userId } = req.tokenPayload;
            const createdExpenditure = yield service.create({ value, userId, date, category, description });
            return res.status(201).json({ expenditure: createdExpenditure });
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.create = create;
function deleteOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedExpenditure = yield service.deleteOne(Number(id));
            return res.status(200).json({ expenditure: deletedExpenditure });
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.deleteOne = deleteOne;
function read(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category, date } = req.query;
            const { id } = req.params;
            const expenditures = yield service.read({ id: Number(id), category, date });
            return res.status(200).json({ expenditures });
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.read = read;
function readMonthExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date, category } = req.query;
            const { id } = req.params;
            const monthExpense = yield service.readMonthExpense({ userId: Number(id), date, category });
            return res.status(200).json({ monthExpense });
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.readMonthExpense = readMonthExpense;
