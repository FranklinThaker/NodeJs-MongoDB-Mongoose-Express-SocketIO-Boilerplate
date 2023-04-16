const {
  validateRegistration,
  validateUserId,
  validateLogin,
  validateUpdateUser,
} = require('./validatorsDefinitions');

const { genericValidator } = require('../../../helpers/helpers');

exports.registerValidator = genericValidator(validateRegistration.allowedParams, validateRegistration.requiredParams);
exports.loginValidator = genericValidator(validateLogin.allowedParams, validateLogin.requiredParams);
exports.userIdValidator = genericValidator(validateUserId.allowedParams, validateUserId.requiredParams);
exports.updateUserValidator = genericValidator(validateUpdateUser.allowedParams, validateUpdateUser.requiredParams);
