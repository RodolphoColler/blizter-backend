import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import * as router from './routes';
import errorHandle from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

const sessionConfig = {
  secret: process.env.JWT_SECRET || '',
  cookie: {
    sameSite: false,
  },
};

const corsConfig = {
  origin: ['http://localhost:3000', 'https://blizter.vercel.app'],
  credentials: true,
};

app.use(session(sessionConfig));

app.use(cors(corsConfig));

app.use('/expenditure', router.expenditure);
app.use('/category', router.category);
app.use('/salary', router.salary);
app.use('/login', router.login);
app.use('/user', router.user);
app.use('/token', router.token);

app.use(errorHandle);

export default app;
