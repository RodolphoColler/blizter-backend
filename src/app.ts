import express from 'express';
import cors from 'cors';
import * as router from './routes';
import errorHandle from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());

const corsConfig = {
  origin: ['http://localhost:3000', 'https://blizter.vercel.app'],
};

app.use(cors(corsConfig));

app.use('/expenditure', router.expenditure);
app.use('/category', router.category);
app.use('/salary', router.salary);
app.use('/login', router.login);
app.use('/user', router.user);
app.use('/token', router.token);

app.use(errorHandle);

export default app;
