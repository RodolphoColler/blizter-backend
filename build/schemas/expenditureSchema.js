"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthExpense = exports.read = exports.create = void 0;
const joi_1 = __importDefault(require("joi"));
const date_1 = __importDefault(require("@joi/date"));
const Joi = joi_1.default.extend(date_1.default);
exports.create = Joi.object({
    value: Joi.number().min(1).required(),
    date: Joi.date().format('YYYY-MM-DD').required(),
    category: Joi.string().empty().required(),
    description: Joi.string().empty().required(),
});
exports.read = Joi.object({
    date: Joi.date().format('YYYY-MM-DD').required(),
    category: Joi.string().empty().required(),
});
exports.monthExpense = Joi.object({
    date: Joi.date().format('YYYY-MM-DD').required(),
});
