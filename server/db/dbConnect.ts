import mongoose from 'mongoose';

import { logger } from '../utils/logger';
import { GlobalSecrets } from '../config/keys';

const connect = async () => {
  try {
    let mongooseOptions = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    const conn = await mongoose.connect(GlobalSecrets.MONGO_URI, mongooseOptions);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(error.message);
  }
};

export const Database = {
  connect 
}
