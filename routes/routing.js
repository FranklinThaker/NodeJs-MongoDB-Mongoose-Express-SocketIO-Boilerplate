const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errorResponses } = require('../helpers/messages');

const whitelist = [`${process.env.FRONT_END_URL}`];
const perIpTimeLimit = 15 * 60 * 1000; // 15 minutes

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(errorResponses.CORS_BLOCK));
    }
  },
};

const { errorHandler } = require('../middleware/errorHandler');

const userRoutes = require('../controllers/user/user.routes');

const apiLimiter = rateLimit({
  windowMs: perIpTimeLimit,
  max: 1000,
  message: {
    error: errorResponses.TOO_MANY_REQUESTS,
  },
});

const routes = (app) => {
  app.use('/api/v1/account', cors(corsOptions), apiLimiter, userRoutes);
  app.use(errorHandler);
};

module.exports = { routes };
