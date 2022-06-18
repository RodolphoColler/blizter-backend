export interface IExpenditure {
  value: number,
  userId: number,
  date: string,
  category: string,
  description: string
}

export interface IQueryExpenditure {
  category: string,
  id: number,
  date: string
}

export interface IQueryMonthExpense {
  userId: number,
  date: string,
}
