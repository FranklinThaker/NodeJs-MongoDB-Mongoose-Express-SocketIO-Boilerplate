const cors = require('cors');
const rateLimit = require('express-rate-limit');
const userRoutes = require('../controllers/v1/user/user.routes');
const { envConstants } = require('../helpers/constants');
const { errorMessages } = require('../helpers/messages');

const whitelist = [`${envConstants.FRONT_END_URL}`, `${envConstants.APP_HOST}:${envConstants.APP_PORT}`, 'http://localhost', envConstants.APP_HOST];

const perIpTimeLimit = 15 * 60 * 1000; // 15 minutes

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(errorMessages.CORS_BLOCK));
    }
  },
};

const { errorHandler } = require('../middleware/errorHandler');

const apiLimiter = rateLimit({
  windowMs: perIpTimeLimit,
  max: 1000,
  message: {
    error: errorMessages.TOO_MANY_REQUESTS,
  },
});

const routes = (app) => {
  app.use('/api/v1/users', cors(corsOptions), apiLimiter, userRoutes);
  app.use(errorHandler);
};

module.exports = { routes };
