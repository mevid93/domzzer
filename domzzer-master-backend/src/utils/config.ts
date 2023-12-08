import { Environment } from '../shared/enums';
import { Configuration } from '../types/types';
import { MongoMemoryServer } from 'mongodb-memory-server';

// eslint-disable-next-line
require('dotenv').config();

// create in memory database instance for testing
const getTestDatabaseUri = async (): Promise<string> => {
  const mongodb = new MongoMemoryServer({
    instance: {
      dbName: 'domzzer_test_db'
    }
  });
  await mongodb.start();
  return mongodb.getUri();
};

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? getTestDatabaseUri()
  : process.env.PROD_MONGODB_URI;

const PORT = process.env.NODE_ENV === 'test'
  ? 5000
  : Number(process.env.PORT);

const AES256_KEY = process.env.NODE_ENV === 'test'
  ? 'UjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9'
  : process.env.PROD_AES256_KEY;

const SECRET = process.env.NODE_ENV === 'test'
  ? 'Xn2r5u8x'
  : process.env.PROD_SECRET;

const SALT_ROUNDS = 10;

const ENVIRONMENT = process.env.NODE_ENV === 'test'
  ? Environment.Test
  : process.env.NODE_ENV === 'development'
    ? Environment.Development
    : Environment.Production;

if (MONGODB_URI === undefined) {
  throw 'MONGODB_URI (environmental variable) can not be undefined!';
}

if (SECRET === undefined) {
  throw 'SECRET (environmental variable) can not be undefined!';
}

if (AES256_KEY === undefined) {
  throw 'AES256_KEY (environmental variable) can not be undefined!';
}

if (PORT === undefined || Number.isNaN(PORT)) {
  throw 'PORT (environmental variable) can not be undefined!';
}

const configuration: Configuration = {
  SALT_ROUNDS,
  SECRET,
  AES256_KEY,
  MONGODB_URI,
  PORT,
  ENVIRONMENT
};

export default configuration;