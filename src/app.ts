import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as router from './routes';
import errorHandle from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

const corsConfig = {
  origin: '*',
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
