import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as router from './routes';

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

app.use('/user', router.user);

export default app;
