import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as router from './routes';
import prisma from './models/prisma';

dotenv.config();

const app = express();

app.use(express.json());

console.log(process.env.FRONTEND_PROD_URL);

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/user', router.user);
app.post('/category', async (req: Request, res: Response) => {
  const { name } = req.body;

  const category = await prisma.category.create({ data: name });

  return res.status(201).json({ category });
});

app.get('/category', async (_req: Request, res: Response) => {
  const category = await prisma.category.findMany();

  return res.status(201).json({ category });
});

export default app;
