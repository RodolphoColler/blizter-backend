import express from 'express';
import * as router from './routes';

const app = express();

app.use(express.json());

app.use('/user', router.user);

export default app;
