const { genericValidator } = require('../../../helpers/helpers');
const {
  validateRegistration,
  validateLogin,
} = require('./validatorsDefinitions');

exports.registerValidator = genericValidator(validateRegistration.allowedParams, validateRegistration.requiredParams);
exports.loginValidator = genericValidator(validateLogin.allowedParams, validateLogin.requiredParams);
