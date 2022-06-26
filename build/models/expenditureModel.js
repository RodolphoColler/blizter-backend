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
exports.readMonthExpense = exports.readOne = exports.deleteOne = exports.read = exports.create = void 0;
const prisma_1 = require("./prisma");
function create({ value, userId, date, category, description }) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdExpenditure = yield prisma_1.prisma.expenditure.create({
            data: {
                value,
                user: { connect: { id: userId } },
                date: new Date(date),
                category,
                description,
            },
        });
        return createdExpenditure;
    });
}
exports.create = create;
function read({ id, category, date }) {
    return __awaiter(this, void 0, void 0, function* () {
        const [year, month, day] = date.split('-');
        const expenditures = yield prisma_1.prisma.expenditure.findMany({
            where: {
                userId: id,
                category,
                date: {
                    gte: new Date(`${year}-${month}-01`),
                    lte: new Date(`${year}-${month}-${day}`),
                },
            },
        });
        return expenditures;
    });
}
exports.read = read;
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const expenditure = yield prisma_1.prisma.expenditure.delete({ where: { id } });
        return expenditure;
    });
}
exports.deleteOne = deleteOne;
function readOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedExpenditure = yield prisma_1.prisma.expenditure.findUnique({ where: { id } });
        return deletedExpenditure;
    });
}
exports.readOne = readOne;
function readMonthExpense({ userId, date, category }) {
    return __awaiter(this, void 0, void 0, function* () {
        const [year, month, day] = date.split('-');
        const monthExpense = yield prisma_1.prisma.expenditure.aggregate({
            where: {
                userId,
                category,
                date: {
                    gte: new Date(`${year}-${month}-01`),
                    lte: new Date(`${year}-${month}-${day}`),
                },
            },
            _sum: {
                value: true,
            },
        });
        return monthExpense;
    });
}
exports.readMonthExpense = readMonthExpense;
