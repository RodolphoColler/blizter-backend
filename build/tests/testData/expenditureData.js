"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMonthExpenditure = exports.monthExpenseServiceResponse = exports.monthExpenseSumNullMock = exports.monthExpenseMock = exports.foundedExpenditure = exports.queryExpenditure = exports.expenditures = exports.expenditure = exports.createdExpenditureMock = void 0;
exports.createdExpenditureMock = {
    id: 1,
    value: 1,
    userId: 1,
    date: new Date('2022-06-08'),
    category: 'Education',
    description: 'Description',
};
exports.expenditure = {
    value: 1,
    userId: 1,
    date: '2022-06-08',
    category: 'Education',
    description: 'Description',
};
exports.expenditures = [
    {
        id: 1,
        value: 1,
        userId: 1,
        date: new Date('2022-06-08'),
        category: 'Education',
        description: 'Description',
    },
];
exports.queryExpenditure = {
    id: 1,
    category: 'Education',
    date: '2022-06-08',
};
exports.foundedExpenditure = {
    id: 1,
    value: 1,
    userId: 1,
    date: new Date('2022-06-08'),
    category: 'Education',
    description: 'Description',
};
exports.monthExpenseMock = {
    _sum: {
        value: 1,
    },
};
exports.monthExpenseSumNullMock = {
    _sum: {
        value: null,
    },
};
exports.monthExpenseServiceResponse = {
    value: 1,
};
exports.queryMonthExpenditure = {
    userId: 1,
    date: '2022-06-08',
};
