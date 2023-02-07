import mongoose from 'mongoose';
import config from '../config';

/**
 * Establish a connection to the MongoDB Driver.
 * @returns {Promise.<void>}
 */
const createConnection = async (): Promise<void> => {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(
      config.isProd ? process.env.MONGO_URI || config.db.uri : config.db.uri,
      config.db.options
    );

    console.log('[mongodb] connected');
  } catch (err) {
    if (err instanceof Error) {
      console.log(`[mongodb] Error: ${err.message}`);

      // terminate the process.
      process.exit(1);
    }
  }
};

export default createConnection;
