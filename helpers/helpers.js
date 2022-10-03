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

exports.generateJWTtoken = (object, secretKey = envConstants.SECRET) => jwt.sign(object, secretKey, { expiresIn: envConstants.JWT_TOKEN_EXPIRATION_TIME });

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

exports.genericValidator = (allowedParams, requiredParams) => (req, res, next) => {
  const param = { ...req.body, ...req.params, ...req.query };

  let failed = false;
  const invalidRequiredParams = [];
  const invalidAllowedParams = [];

  Object.keys(param).forEach((element) => {
    if (!allowedParams.includes(element)) {
      failed = true;
      invalidAllowedParams.push(element);
    }
  });

  requiredParams.forEach((element) => {
    if (!Object.prototype.hasOwnProperty.call(param, element)) {
      failed = true;
      invalidRequiredParams.push(element);
    }
  });

  const invalidString = {
    'Required parameters that are not provided': invalidRequiredParams,
    'Not allowed parameters that are provided': invalidAllowedParams,
  };

  if (failed) return exports.errorResponse(req, res, errorMessages.INVALID_PARAMS, 400, invalidString);
  return next();
};
