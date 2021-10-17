const { errorResponse } = require('../../helpers/helpers');
const { errorMessages } = require('../../helpers/messages');
const {
  validateRegistration,
  validateLogin,
} = require('./validatorsDefinitions');

const genericValidator = (allowedParams, requiredParams) => (req, res, next) => {
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
    'Required parameters that are not provided': invalidRequiredParams || undefined,
    'Not allowed parameters that are provided': invalidAllowedParams || undefined,
  };

  if (failed) return errorResponse(req, res, errorMessages.INVALID_PARAMS, 400, invalidString);
  return next();
};

exports.registerValidator = genericValidator(validateRegistration.allowedParams, validateRegistration.requiredParams);

exports.loginValidator = genericValidator(validateLogin.allowedParams, validateLogin.requiredParams);
