"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const joiSchema = joi_1.default.object({
    email: joi_1.default.string().empty().required().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        .messages({ 'string.pattern.base': '"email" must be a valid email' }),
    password: joi_1.default.string().empty().min(7).required(),
    name: joi_1.default.string().empty().required(),
});
exports.default = joiSchema;
