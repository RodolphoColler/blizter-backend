import express from 'express';
import cors from 'cors';
import * as router from './routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/expenditure', router.expenditure);
app.use('/category', router.category);
app.use('/login', router.login);
app.use('/user', router.user);

export default app;
