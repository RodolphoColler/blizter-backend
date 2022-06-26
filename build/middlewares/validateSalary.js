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
exports.updateOne = exports.readOne = exports.create = void 0;
const schemas = __importStar(require("../schemas/salarySchema"));
function create(req, res, next) {
    const { value, date } = req.body;
    const { error } = schemas.create.validate({ value, date });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
}
exports.create = create;
function readOne(req, res, next) {
    const { date } = req.query;
    const { error } = schemas.readOne.validate({ date });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
}
exports.readOne = readOne;
function updateOne(req, res, next) {
    const { value } = req.body;
    const { error } = schemas.updateOne.validate({ value });
    if (error)
        return res.status(400).json({ message: error.message });
    return next();
}
exports.updateOne = updateOne;
