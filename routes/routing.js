const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errorMessages } = require('../helpers/messages');
const { envConstants } = require('../helpers/constants');

let whitelist = [`${envConstants.FRONT_END_URL}`];
if (process.env.NODE_ENV !== 'test') {
  whitelist = [`${envConstants.FRONT_END_URL}`];
} else {
  whitelist = ['http://localhost'];
}

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

const userRoutes = require('../controllers/v1/user/user.routes');

const apiLimiter = rateLimit({
  windowMs: perIpTimeLimit,
  max: 1000,
  message: {
    error: errorMessages.TOO_MANY_REQUESTS,
  },
});

const routes = (app) => {
  app.use('/api/v1/account', cors(corsOptions), apiLimiter, userRoutes);
  app.use(errorHandler);
};

module.exports = { routes };
