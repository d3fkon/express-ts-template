import path from 'path';
import * as dotenv from 'dotenv';

declare const process: {
  env: {
    NODE_ENV: string;
    [key: string]: string;
  };
};

let envPath;
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

export const EquifaxSecrets = {
  EQUIFAX_USER_ID: env.EQUIFAX_UID,
  EQUIFAX_PWD: env.EQUIFAX_PWD,
  EQUIFAX_MEMBER_NUMBER: env.EQUIFAX_MEMBER_NUMBER,
  EQUIFAX_SECURITY_CODE: env.EQUIFAX_SECURITY_CODE,
};
