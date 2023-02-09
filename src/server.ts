import dotenv from 'dotenv';

dotenv.config();

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import db from './db';
import routes from './routes';
import config from './config';

// express application.
const app: Application = express();

// middlewares.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(config.cors));
app.use(morgan('dev'));

// connect mongodb.
db();

app.use('/api/v1', routes);

export default app;
