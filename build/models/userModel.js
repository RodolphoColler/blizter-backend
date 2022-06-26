"use strict";
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
exports.readCategory = exports.updateCategory = exports.readOneById = exports.readOne = exports.create = void 0;
const prisma_1 = require("./prisma");
function create(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdUser = yield prisma_1.prisma.user.create({ data: user });
        return createdUser;
    });
}
exports.create = create;
function readOne(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
        return user;
    });
}
exports.readOne = readOne;
function readOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
        return user;
    });
}
exports.readOneById = readOneById;
function updateCategory(id, categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield prisma_1.prisma.user.update({
            where: { id },
            data: {
                categories: { connect: { id: categoryId } },
            },
            select: { categories: true },
        });
        return categories;
    });
}
exports.updateCategory = updateCategory;
function readCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield prisma_1.prisma.user.findUnique({ where: { id }, select: { categories: true } });
        return categories;
    });
}
exports.readCategory = readCategory;
