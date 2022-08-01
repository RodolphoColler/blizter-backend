export interface IExpenditure {
  value: number,
  userId: number,
  date: string,
  categoryId: number,
  description: string
}

export interface IQueryExpenditure {
  userId: number,
  date: string
}

export interface IGroupedExpenditure {
  categoryId: number,
  _sum: { value: number | null } | null
}
