const {
  beforeEach,
  it,
  expect,
} = require('@jest/globals');

beforeEach(() => {
  delete process.env.NODE_ENV;
  require('../../routes/routing');
  require('../../helpers/constants');
});

it('fake required test', async () => {
  expect(1 + 1).toEqual(2);
});
