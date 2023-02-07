import dotenv from 'dotenv';

dotenv.config();

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';

// express application.
const app: Application = express();

// middlewares.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(config.cors));
app.use(morgan('dev'));

export default app;
