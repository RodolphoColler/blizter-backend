"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const router = (0, express_1.Router)();
router.get('/', validateToken_1.default, (req, res) => {
    const { tokenPayload: id } = req;
    return res.status(200).json(id);
});
exports.default = router;
