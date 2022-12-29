import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import * as router from './routes';
import errorHandle from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

const corsConfig = {
  origin: ['http://localhost:3000', 'https://blizter.vercel.app'],
  credentials: true,
};

app.use(cors(corsConfig));

app.use('/expenditure', router.expenditure);
app.use('/category', router.category);
app.use('/salary', router.salary);
app.use('/signin', router.signIn);
app.use('/user', router.user);
app.use('/token', router.token);

app.use(errorHandle);

export default app;
