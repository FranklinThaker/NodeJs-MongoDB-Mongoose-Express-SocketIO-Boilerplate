const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./api_docs');
const dbConn = require('./connection/db.connect');
const { envConstants } = require('./helpers/constants');

const app = express();
const { getROLES } = require('./middleware/middleware');

dbConn.connect();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(logger('common', { skip: () => process.env.NODE_ENV === 'test' }));

app.use('/', express.static('./uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.get('/', (req, res) => {
  res.statusCode = 302;
  res.setHeader('Location', `${envConstants.APP_HOST}:${envConstants.APP_PORT}/api-docs`);
  res.end();
});
getROLES(); // to generate the ROLE object for role based authentication/authorization

require('./routes/routing').routes(app);

module.exports = app;
