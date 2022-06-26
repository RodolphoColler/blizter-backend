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
exports.readCategory = exports.updateCategory = exports.create = void 0;
const service = __importStar(require("../services/userService"));
var errors;
(function (errors) {
    errors[errors["User already exist."] = 400] = "User already exist.";
    errors[errors["Category not existent."] = 400] = "Category not existent.";
    errors[errors["User not exists."] = 400] = "User not exists.";
})(errors || (errors = {}));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, name } = req.body;
            const token = yield service.create({ email, password, name });
            return res.status(201).json({ token });
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
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.body;
            const { id } = req.params;
            const categories = yield service.updateCategory(Number(id), categoryId);
            return res.status(200).json(categories);
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.updateCategory = updateCategory;
function readCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const categories = yield service.readCategory(Number(id));
            return res.status(200).json(categories);
        }
        catch (error) {
            const { message } = error;
            if (message in errors)
                return res.status(Number(errors[message])).json({ message });
            return res.status(500).json({ message: 'Inside server error.' });
        }
    });
}
exports.readCategory = readCategory;
