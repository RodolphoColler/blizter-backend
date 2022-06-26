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
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthExpense = exports.read = exports.create = void 0;
const schemas = __importStar(require("../schemas/expenditureSchema"));
function create(req, res, next) {
    const { value, date, category, description } = req.body;
    const { error } = schemas.create.validate({ value, date, category, description });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
}
exports.create = create;
function read(req, res, next) {
    const { date, category } = req.query;
    const { error } = schemas.read.validate({ date, category });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
}
exports.read = read;
function monthExpense(req, res, next) {
    const { date } = req.query;
    const { error } = schemas.monthExpense.validate({ date });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
}
exports.monthExpense = monthExpense;
