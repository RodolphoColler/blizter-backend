import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

console.log(process.env.FRONTEND_PROD_URL);

const corsOptions = {
  origin: process.env.FRONTEND_PROD_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Working now' });
});

export default app;
