exports.validateRegistration = {
  allowedParams: ['name', 'email', 'role', 'password', 'status'],
  requiredParams: ['name', 'email', 'password'],
};

exports.validateLogin = {
  allowedParams: ['email', 'password'],
  get requiredParams() {
    return this.allowedParams;
  },
};
