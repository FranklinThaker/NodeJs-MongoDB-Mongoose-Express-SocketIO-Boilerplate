// Load environment variables.
require('dotenv').config();

const mongoose = require('mongoose');

const connectionObj = {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

if (process.env.ENVIRONMENT === 'testing') {
  delete connectionObj.auth;
}

exports.connect = async () => {
  // Configuring the database
  mongoose.Promise = global.Promise;
  // mongoose.set('debug', true);
  // Connecting to the database
  try {
    await mongoose.connect(`${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, connectionObj);
    console.log('Successfully connected to the database');
  } catch (error) {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit();
  }
};

exports.disconnect = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.disconnect();
};

exports.removeDB = async () => {
  const mongodbconnection = require('mongoose');
  await mongodbconnection.connect(`${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  const { connection } = mongodbconnection;
  connection.once('open', async () => {
    console.log('*** MongoDB got connected ***');
    console.log(`Our Current Database Name : ${connection.db.databaseName}`);
    mongodbconnection.connection.db.dropDatabase(console.log(`${connection.db.databaseName} database dropped.`));
  });
};
