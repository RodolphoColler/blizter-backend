"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { JWT_SECRET } = process.env;
const jwtConfig = { expiresIn: '7d' };
function jwtToken(id) {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET || '', jwtConfig);
}
exports.jwtToken = jwtToken;
function jwtVerify(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET || '');
}
exports.jwtVerify = jwtVerify;
