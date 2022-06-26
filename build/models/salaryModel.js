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
exports.updateOne = exports.readOneById = exports.readOne = exports.create = void 0;
const prisma_1 = require("./prisma");
function create({ value, userId, date }) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdSalary = yield prisma_1.prisma.salary.create({
            data: {
                value,
                user: { connect: { id: userId } },
                date: new Date(date),
            },
        });
        return createdSalary;
    });
}
exports.create = create;
function readOne({ userId, date }) {
    return __awaiter(this, void 0, void 0, function* () {
        const [year, month, day] = date.split('-');
        const salary = yield prisma_1.prisma.salary.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(`${year}-${month}-01`),
                    lte: new Date(`${year}-${month}-${day}`),
                },
            },
        });
        return salary;
    });
}
exports.readOne = readOne;
function readOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const salary = yield prisma_1.prisma.salary.findUnique({ where: { id } });
        return salary;
    });
}
exports.readOneById = readOneById;
function updateOne({ id, value }) {
    return __awaiter(this, void 0, void 0, function* () {
        const salary = yield prisma_1.prisma.salary.update({
            where: { id },
            data: { value },
        });
        return salary;
    });
}
exports.updateOne = updateOne;
