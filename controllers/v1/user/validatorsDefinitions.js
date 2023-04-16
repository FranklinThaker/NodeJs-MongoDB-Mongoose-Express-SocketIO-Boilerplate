exports.validateRegistration = {
  allowedParams: ['name', 'email', 'role', 'password', 'status'],
  requiredParams: ['name', 'email', 'password', 'role'],
};

exports.validateLogin = {
  allowedParams: ['email', 'password'],
  get requiredParams() {
    return this.allowedParams;
  },
};

exports.validateUserId = {
  allowedParams: ['userId'],
  get requiredParams() {
    return this.allowedParams;
  },
};

exports.validateUpdateUser = {
  allowedParams: ['userId', 'name'],
  get requiredParams() {
    return this.allowedParams;
  },
};
