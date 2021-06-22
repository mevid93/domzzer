require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.PROD_MONGODB_URI

const AES256_KEY = process.env.NODE_ENV === 'test'
  ? process.env.TEST_AES256_KEY
  : process.env.PROD_AES256_KEY

const SECRET = process.env.NODE_ENV === 'test'
  ? process.env.TEST_SECRET
  : process.env.PROD_SECRET

const SALT_ROUNDS = 10

module.exports = {
  SALT_ROUNDS,
  SECRET,
  AES256_KEY,
  MONGODB_URI,
  PORT
}