import { CorsOptions } from 'cors';

interface IConfig {
  isProd: boolean;
  port: number;
  cors: CorsOptions;
}

const config: Readonly<IConfig> = {
  isProd: process.env.NODE_ENV === 'production',
  port: 8080,
  cors: {
    origin: ['http://localhost:3000'],
  },
};

export default config;
