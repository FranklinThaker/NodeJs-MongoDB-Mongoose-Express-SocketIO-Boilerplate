const {
  beforeEach,
  it,
  expect,
} = require('@jest/globals');

const mongoose = require('mongoose');
const sinon = require('sinon');
const connectionFile = require('../../connection/db.connect');
const { connect, removeDB } = require('../../connection/db.connect');

beforeEach(() => {
  sinon.restore();
  // eslint-disable-next-line no-undef
  jest.resetModules(); // Most important - it clears the cache
  delete process.env.NODE_ENV;
  process.env.AUTHENTICATION = 'true';
  require('../../helpers/constants');
  require('../../connection/db.connect');
});

it('should test connection', async () => {
  sinon.stub(connectionFile, 'connect').callsFake();
  sinon.stub(mongoose, 'connect').callsFake();
  await connect();
});

it('should throw connection error', async () => {
  // eslint-disable-next-line no-undef
  process.exit = jest.fn(() => { throw new Error('mockExit'); });
  sinon.stub(mongoose, 'connect').throws(Error('mockExit'));
  try {
    await connect();
  } catch (error) {
    expect(error).toStrictEqual(Error('mockExit'));
    expect(process.exit).toBeCalledWith(1);
  }
});

it('should test removeDB', async () => {
  // eslint-disable-next-line no-undef
  sinon.stub(mongoose.connection, 'dropDatabase').callsFake();
  sinon.stub(mongoose.connection, 'close').callsFake();
  await removeDB();
});
