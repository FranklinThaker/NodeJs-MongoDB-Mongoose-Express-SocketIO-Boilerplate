const jwt = require('jsonwebtoken');
const SimpleCrypto = require('simple-crypto-js').default;
const crypto = require('crypto');

const JWT_TOKEN_EXPIRATION_TIME = '7d';

const { errorResponses, successResponses } = require('./messages');

const encryptionKey = process.env.ENCRYPTION_KEY || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456';
const secretKeyForJWT = process.env.SECRET || 'PHRANKLIN';

exports.successResponse = (req, res, data, message = successResponses.OPERATION_COMPLETED, code = 200) => {
  res.status(code);
  res.send({
    code,
    success: true,
    message,
    data,
  });
};

exports.errorResponse = (req, res, message = errorResponses.SOMETHING_WENT_WRONG, code = 500) => {
  res.status(code);
  res.send({
    code,
    success: false,
    message,
    data: null,
  });
};

exports.generateJWTtoken = (object, secretKey = secretKeyForJWT) => jwt.sign(JSON.parse(JSON.stringify(object)), secretKey, { expiresIn: JWT_TOKEN_EXPIRATION_TIME });

exports.decrypt = (text) => {
  const simpleCrypto = new SimpleCrypto(encryptionKey);
  const chiperText = simpleCrypto.decrypt(text);
  return chiperText;
};

exports.encrypt = (text) => {
  const simpleCrypto = new SimpleCrypto(encryptionKey);
  const chiperText = simpleCrypto.encrypt(text);
  return chiperText;
};

exports.comparePassword = (paramPass, dbPass) => {
  const password = crypto
    .createHash('md5')
    .update(paramPass)
    .digest('hex');
  if (password === dbPass) return true;
  return false;
};
