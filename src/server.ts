import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const server = app.listen(process.env.PORT, () => console.log(`Online on ${process.env.PORT}`));

export default server;
