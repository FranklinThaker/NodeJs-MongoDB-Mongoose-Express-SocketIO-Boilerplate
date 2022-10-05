const { envConstants } = require('../helpers/constants');

module.exports = {
  servers: [
    {
      url: `${envConstants.APP_HOST}:${envConstants.APP_PORT}`,
      description: 'Server URL',
    },
  ],
};
