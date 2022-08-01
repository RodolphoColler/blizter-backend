export const createdExpenditureMock = {
  id: 1,
  value: 1,
  userId: 1,
  date: new Date('2022-06-08'),
  description: 'Description',
  "categoryId": 1,
  "category": {
      "id": 1,
      "name": "Education"
  }
};

export const expenditure = {
  value: 1,
  userId: 1,
  date: '2022-06-08',
  description: 'Description',
  "categoryId": 1,
  "category": {
      "id": 1,
      "name": "Education"
  }
};

export const expenditures = [
  {
    id: 1,
    value: 1,
    userId: 1,
    date: new Date('2022-06-08'),
    description: 'Description',
    "categoryId": 1,
    "category": {
        "id": 1,
        "name": "Education"
    }
  },
];

export const queryExpenditure = {
  userId: 1,
  categoryId: 1,
  date: '2022-06-08',
};

export const foundedExpenditure = {
  id: 1,
  value: 1,
  userId: 1,
  date: new Date('2022-06-08'),
  description: 'Description',
  "categoryId": 1,
  "category": {
      "id": 1,
      "name": "Education"
  }
};

export const modelMonthExpenseMock = [
  { _sum: { value: 1 }, categoryId: 1 },
]

export const monthExpenseSumNullMock = {
  _sum: {
    value: null,
  },
};

export const monthExpenseServiceResponse = [
  {
    "sum": 1,
    "category": {
        "id": 1,
        "name": "Education"
    }
  }
];

export const queryMonthExpenditure = {
  userId: 1,
  date: '2022-06-08',
};
