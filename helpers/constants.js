require('dotenv').config();

exports.envConstants = {
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || 'test_db',
  DB_PASS: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,
  DB_DIALECT: process.env.DB_DIALECT || 'mongodb',
  DB_DEBUG_MODE: process.env.DB_DEBUG_MODE || 'false',
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: process.env.APP_PORT || 4000,
  SECRET: process.env.SECRET || 'PHRANKLIN',
  NODE_ENV: process.env.NODE_ENV || 'dev',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
  AUTHENTICATION: process.env.AUTHENTICATION || 'false',
  REDIS_SERVER: process.env.REDIS_SERVER || 'false',
  FRONT_END_URL: process.env.FRONT_END_URL || 'http://localhost:3000',
  JWT_TOKEN_EXPIRATION_TIME: process.env.JWT_TOKEN_EXPIRATION_TIME || '7d',
  SSL_CERT_PATH: process.env.SSL_CERT_PATH,
  SSL_KEY_PATH: process.env.SSL_KEY_PATH,
};
