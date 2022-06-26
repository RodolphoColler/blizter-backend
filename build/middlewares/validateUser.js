"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
exports.default = (req, res, next) => {
    const { email, password, name } = req.body;
    const { error } = userSchema_1.default.validate({ email, password, name });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
};
