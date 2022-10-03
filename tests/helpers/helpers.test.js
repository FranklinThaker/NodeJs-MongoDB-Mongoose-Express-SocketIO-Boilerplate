const {
  it,
} = require('@jest/globals');
const sinon = require('sinon');
const helpersFile = require('../../helpers/helpers');
const { successResponse, errorResponse } = require('../../helpers/helpers');

it('should test successResponse', async () => {
  sinon.stub(helpersFile, 'successResponse').callsFake();
  successResponse({}, { status: () => {}, send: () => {} });
});

it('should test errorResponse', async () => {
  sinon.stub(helpersFile, 'errorResponse').callsFake();
  errorResponse({}, { status: () => {}, send: () => {} });
});
