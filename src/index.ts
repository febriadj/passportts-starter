import server from './server';
import config from './config';

const port: number | string = process.env.PORT || config.port;

// print process to console.
const print = () => {
  console.log(`[${port}] server running...`);
};

server.listen(port, print);
