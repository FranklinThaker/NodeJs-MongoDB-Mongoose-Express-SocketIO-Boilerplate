const rateLimit = require('express-rate-limit');
const cors = require('cors');

const whitelist = [`${process.env.FRONT_END_URL}`, 'https://localhost:3000'];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const { errorHandler } = require('../middleware/errorHandler');

const userRoutes = require('../controllers/user/user.routes');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: {
    error: 'Too many requests from this IP, please try again after 15 Minutes',
  },
});

const routes = (app) => {
  app.use('/api/v1/account', cors(corsOptions), apiLimiter, userRoutes);
  app.use(errorHandler);
};

module.exports = { routes };
