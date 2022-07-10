import { Configuration } from '../types/types';

// eslint-disable-next-line
require('dotenv').config();

const PORT = Number(process.env.PORT);

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.PROD_MONGODB_URI;

const AES256_KEY = process.env.NODE_ENV === 'test'
  ? process.env.TEST_AES256_KEY
  : process.env.PROD_AES256_KEY;

const SECRET = process.env.NODE_ENV === 'test'
  ? process.env.TEST_SECRET
  : process.env.PROD_SECRET;

const SALT_ROUNDS = 10;


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
  PORT
};

export default configuration;