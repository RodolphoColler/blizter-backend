interface IToken {
  id: number,
  email: string,
}

declare namespace Express {
  interface Request {
      tokenPayload?: IToken;
  }
}
