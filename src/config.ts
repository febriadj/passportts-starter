import { CorsOptions } from 'cors';
import { ConnectOptions } from 'mongoose';

interface IDatabase {
  uri: string;
  options?: ConnectOptions;
}

interface IConfig {
  isProd: boolean;
  port: number;
  cors: CorsOptions;
  db: IDatabase;
}

const config: Readonly<IConfig> = {
  isProd: process.env.NODE_ENV === 'production',
  port: 8080,
  cors: {
    origin: ['http://localhost:3000'],
    // optionsSuccessStatus: 204,
    // methods: '',
  },
  db: {
    uri: 'mongodb://127.0.0.1:27017/passportts-starter',
    // options: {},
  },
};

export default config;
