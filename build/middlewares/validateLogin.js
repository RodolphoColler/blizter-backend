"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginSchema_1 = __importDefault(require("../schemas/loginSchema"));
exports.default = (req, res, next) => {
    const { email, password } = req.body;
    const { error } = loginSchema_1.default.validate({ email, password });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
};
