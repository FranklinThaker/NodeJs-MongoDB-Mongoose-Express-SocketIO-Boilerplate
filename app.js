const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const { getROLES } = require('./middleware/middleware');

const dbConn = require('./connection/db.connect');

dbConn.connect();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(logger('common', { skip: () => process.env.NODE_ENV === 'test' }));

app.use('/', express.static('./uploads'));

getROLES(); // to generate the ROLE object for role based authentication/authorization

require('./routes/routing').routes(app);

module.exports = app;
