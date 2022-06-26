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
const service = __importStar(require("../services/salaryService"));
var errors;
(function (errors) {
    errors[errors["User not exists."] = 400] = "User not exists.";
    errors[errors["Salary not exists."] = 400] = "Salary not exists.";
})(errors || (errors = {}));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { value, date } = req.body;
            const { id: userId } = req.tokenPayload;
            const createdSalary = yield service.create({ value, userId, date });
            return res.status(201).json({ salary: createdSalary });
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
function readOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { date } = req.query;
            const { id } = req.params;
            const salary = yield service.readOne({ userId: Number(id), date });
            return res.status(200).json({ salary });
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.readOne = readOne;
function updateOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { value } = req.body;
            const { id } = req.params;
            const salary = yield service.updateOne({ id: Number(id), value });
            return res.status(200).json({ salary });
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.updateOne = updateOne;
