const jwt = require('jsonwebtoken');
const SimpleCrypto = require('simple-crypto-js').default;
const crypto = require('crypto');
const { envConstants } = require('./constants');

const { errorMessages, successMessages } = require('./messages');

exports.successResponse = (req, res, data, message = successMessages.OPERATION_COMPLETED, code = 200) => {
  res.status(code);
  res.send({
    code,
    success: true,
    message,
    data,
  });
};

exports.errorResponse = (req, res, message = errorMessages.SOMETHING_WENT_WRONG, code = 500) => {
  res.status(code);
  res.send({
    code,
    success: false,
    message,
    data: null,
  });
};

exports.generateJWTtoken = (object, secretKey = envConstants.SECRET) => jwt.sign(JSON.parse(JSON.stringify(object)), secretKey, { expiresIn: envConstants.JWT_TOKEN_EXPIRATION_TIME });

exports.decrypt = (text) => {
  const simpleCrypto = new SimpleCrypto(envConstants.ENCRYPTION_KEY);
  const plainText = simpleCrypto.decrypt(text);
  return plainText;
};

exports.encrypt = (text) => {
  const simpleCrypto = new SimpleCrypto(envConstants.ENCRYPTION_KEY);
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
