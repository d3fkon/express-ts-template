import path from 'path';
import * as dotenv from 'dotenv';

declare const process: {
  env: {
    NODE_ENV: string;
    [key: string]: string;
  };
};

let envPath: string;
//Load env vars according to NODE_ENV
switch (process.env.NODE_ENV) {
  case 'test':
    envPath = path.resolve(__dirname, 'test.env');
    break;
  case 'production':
    envPath = path.resolve(__dirname, 'prod.env');
    break;
  default:
    envPath = path.resolve(__dirname, 'dev.env');
}

dotenv.config({ path: envPath });

const { env } = process;

export const GlobalSecrets = {
  MONGO_URI: env.MONGO_URI,
};

/**
 * Example ENV
 * export const EquifaxSecrets = {
 *    SECRET_NAME: env.SECRET_NAME
 *    SECRET_NAME_2: env.SECRET_NAME_2 
 * }
*/
