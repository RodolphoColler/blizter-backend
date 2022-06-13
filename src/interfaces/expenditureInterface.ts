export interface IExpenditure {
  expenditure: number,
  userId: number,
  date: string,
  category: string
}

export interface IQueryExpenditure {
  category: string,
  id: number,
  date: string
}
