const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { envConstants } = require('../helpers/constants');

const connectionObj = {
  auth: {
    user: envConstants.DB_USER,
    password: envConstants.DB_PASS,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

if (envConstants.AUTHENTICATION === 'false') delete connectionObj.auth;

let mongoServer;

exports.connect = async () => {
  mongoose.Promise = global.Promise;
  mongoose.set('debug', envConstants.DB_DEBUG_MODE === 'true');
  try {
    if (process.env.NODE_ENV !== 'test') {
      await mongoose.connect(`${envConstants.DB_DIALECT}://${envConstants.DB_HOST}:${envConstants.DB_PORT}/${envConstants.DB_NAME}`, connectionObj);
    } else {
      mongoose.set('useFindAndModify', false);
      mongoServer = await MongoMemoryServer.create();
      const uri = await mongoServer.getUri();
      await mongoose.connect(uri, connectionObj);
    }
  } catch (error) {
    process.exit(1);
  }
};

exports.removeDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
};

/* exports.removeDB = async () => {
  const { connection } = mongoose;
  connection.once('open', async () => {
    mongoose.connection.db.dropDatabase(connection.db.databaseName);
  });
}; */

/* exports.disconnect = async () => {
  mongoose.Promise = global.Promise;
  await mongoose.disconnect();
}; */
