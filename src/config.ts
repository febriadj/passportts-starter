import { CorsOptions } from 'cors';
import { ConnectOptions } from 'mongoose';

export interface IDatabase {
  uri: string;
  options?: ConnectOptions;
}

export interface IOAuthOptions {
  successRedirect: string;
  failureRedirect: string;
}

export interface IConfig {
  isProd: boolean;
  port: number;
  clientHost: string;
  cors: CorsOptions;
  db: IDatabase;
  oauth: IOAuthOptions;
}

const clientHost = 'http://localhost:3000';

const config: Readonly<IConfig> = {
  isProd: process.env.NODE_ENV === 'production',
  port: 8080,
  clientHost,
  cors: {
    origin: [clientHost],
    // optionsSuccessStatus: 204,
    // methods: '',
  },
  db: {
    uri: 'mongodb://127.0.0.1:27017/passportts-starter',
    // options: {},
  },
  oauth: {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  },
};

export default config;
