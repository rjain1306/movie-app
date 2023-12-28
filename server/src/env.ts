import * as dotenv from 'dotenv';
import * as path from 'path';
import {
  getOsEnv,
  getOsEnvOptional,
  toNumber,
} from './utils/env/env-extensions';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: path.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
  ),
});

/**
 * Environment variables
 */
export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'qa',
  isDevelopment: process.env.NODE_ENV === 'development',
  db: {
    type: getOsEnv('DB_CONNECTION'),
    host: getOsEnvOptional('DB_HOST'),
    port: toNumber(getOsEnvOptional('DB_PORT')),
    username: getOsEnvOptional('DB_USERNAME'),
    password: getOsEnvOptional('DB_PASSWORD'),
    database: getOsEnv('DB_DATABASE'),
  },
  awsS3: {
    bucketName: getOsEnvOptional('AWS_BUCKET_NAME'),
    documentBucketName: getOsEnvOptional('AWS_DOCUMENT_BUCKET_NAME'),
    region: getOsEnv('AWS_REGION'),
    accessKey: getOsEnvOptional('AWS_ACCESS_KEY'),
    secretAccessKey: getOsEnvOptional('AWS_SECRET_ACCESS_KEY'),
  },
  basicAuth: {
    userName: getOsEnv('BASIC_AUTH_USERNAME'),
    password: getOsEnv('BASIC_AUTH_PASSWORD'),
  },
  appSetting: {
    appBaseUrl: getOsEnv('APP_BASE_URL'),
  },
};
