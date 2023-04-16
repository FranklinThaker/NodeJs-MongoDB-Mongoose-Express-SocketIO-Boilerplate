/* eslint-disable no-undef */
/* const {
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
 */

const {
  expect,
  it,
  describe,
  beforeEach,
} = require('@jest/globals');
const { successResponse, errorResponse } = require('../../helpers/helpers'); // Replace with the actual path to your module

describe('successResponse', () => {
  let res;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    res = { status: jest.fn(), send: jest.fn() };
  });

  it('should send a success response with the correct data and status code', async () => {
    const data = [{ _id: '1', name: 'John' }, { _id: '2', name: 'Jane' }];
    await successResponse('type', res, data);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      code: 200,
      success: true,
      message: 'Operation completed.',
      data: [{ id: '1', type: 'type', attributes: { name: 'John' } }, { id: '2', type: 'type', attributes: { name: 'Jane' } }],
    });
  });

  it('should send a success response with custom message and status code', async () => {
    const data = [];
    const message = 'Custom success message';
    const code = 201;
    await successResponse('type', res, data, message, code);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(code);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      code,
      success: true,
      message,
      data: [],
    });
  });
});

describe('errorResponse', () => {
  let res;

  beforeEach(() => {
    res = { status: jest.fn(), send: jest.fn() };
  });

  it('should send an error response with the correct data and status code', () => {
    const message = 'Something went wrong.';
    const code = 500;
    const data = { error: 'Error data' };
    errorResponse({}, res, message, code, data);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(code);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      code,
      success: false,
      message,
      data,
    });
  });

  it('should send an error response with default message and status code', () => {
    errorResponse({}, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({
      code: 500,
      success: false,
      message: 'Something went wrong.',
      data: null,
    });
  });
});
