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

if (process.env.AUTHENTICATION === 'false') delete connectionObj.auth;

const connectToDB = async () => mongoose.connect(`${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, connectionObj);

exports.connect = async () => {
  mongoose.Promise = global.Promise;
  mongoose.set('debug', process.env.DB_DEBUG_MODE === 'true');
  try {
    await mongoose.connect(`${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, connectionObj);
    console.info('Successfully connected to the database');
  } catch (error) {
    console.error('Could not connect to the database. Exiting now...', error);
    process.exit();
  }
};

exports.disconnect = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.disconnect();
};

exports.removeDB = async () => {
  await connectToDB();
  const { connection } = mongoose;
  connection.once('open', async () => {
    console.warn(`Our Current Database Name : ${connection.db.databaseName}`);
    mongoose.connection.db.dropDatabase(console.info(`${connection.db.databaseName} database dropped.`));
  });
};
