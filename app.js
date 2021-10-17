const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const glob = require('glob');

const app = express();
const { getROLES } = require('./middleware/middleware');

const dbConn = require('./connection/db.connect');

dbConn.connect();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(logger('common'));

app.use('/', express.static('./uploads'));

const initRoutes = (application) => {
  glob('./routes/*.js', (err, routes) => {
    if (err) {
      console.error('Routing files issue ->', err);
      return;
    }
    routes.forEach((routePath) => require(routePath).routes(application));
  });
};

initRoutes(app);

getROLES(); // to generate the ROLE object for role based authentication/authorization

module.exports = app;
