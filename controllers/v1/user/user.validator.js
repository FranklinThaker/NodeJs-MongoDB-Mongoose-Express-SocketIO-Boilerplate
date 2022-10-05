const {
  validateRegistration,
  validateLogin,
} = require('./validatorsDefinitions');
const { genericValidator } = require('../../../helpers/helpers');

exports.registerValidator = genericValidator(validateRegistration.allowedParams, validateRegistration.requiredParams);
exports.loginValidator = genericValidator(validateLogin.allowedParams, validateLogin.requiredParams);
