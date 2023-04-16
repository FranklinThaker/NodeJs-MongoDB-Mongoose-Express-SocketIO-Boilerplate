const { usersApiDocumentation } = require('../../controllers/v1/user/users.api.documentation');

module.exports = {
  paths: {
    ...usersApiDocumentation,
  },
};
