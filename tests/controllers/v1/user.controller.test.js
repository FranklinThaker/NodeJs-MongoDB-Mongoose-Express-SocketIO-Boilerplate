const {
  expect,
  it,
  describe,
  afterAll,
  beforeEach,
} = require('@jest/globals');
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../../app');
const { removeDB } = require('../../../connection/db.connect');
const UsersModel = require('../../../models/users');

let authorizationToken;
let user;

afterAll(async () => removeDB());

beforeEach(() => {
  sinon.restore();
  process.env.DB_PORT = 1234;
  require('../../../helpers/constants');
});

const expiredToken = '2f3baa79cd1b0dc012a0ba314b24863558ed64d041f1d0df24e775168d4a94d2YLHPXjn5cPgUpBqUeUEgc33Udw6HcJwDje5LURqRSFXATEsG+LkMTEHjCfGh9TBbdzpyrkCA8BWfwk1V3OykhjDz+v5M0nRCXvHzP/juxyBNval3M6Ur6/M6IzFVIP5opSYbrrecU6tY0cTua3YuCXIfBKlo+dLYu7hnlQHpT/yntbn/bMvj4ZGO2AcMp4dXvqZcSCe+a1sL5iWEGVbrR4CpqSAQL9WL+uEReO1qAWgywSdsNNtTjb2ytgJchxto491c711c1eab7f9799952c8a147aed02db974cf72f359f71942a9ff600b5da63';
const invalidToken = 'invalid_token';
let adminRoleToken = '';

const login = async () => {
  const res = await request(app)
    .post('/api/v1/account/login')
    .send({
      email: 'frank@test.com',
      password: 'pwd',
    });
  authorizationToken = res.body.data.token;
  user = res.body.data.user;
};

describe('Happy Path -> Users', () => {
  it('should register a user with user role', async () => {
    const res = await request(app)
      .post('/api/v1/account/register')
      .send({
        name: 'frank',
        email: 'frank@test.com',
        password: 'pwd',
      });
    const UserData = res.body.data;
    user = UserData;
    expect(res.statusCode).toBe(200);
    expect(UserData._id).toBeDefined();
    expect(UserData.name).toBe('frank');
    expect(UserData.email).toBe('frank@test.com');
    expect(UserData.password).toBe('9003d1df22eb4d3820015070385194c8');
    expect(UserData.role).toBe('user');
    expect(UserData.status).toBe(true);
  });

  it('should register a user with admin role', async () => {
    const res = await request(app)
      .post('/api/v1/account/register')
      .send({
        name: 'frank',
        email: 'frankthaker@test.com',
        password: 'pwd',
        role: 'admin',
      });
    const UserData = res.body.data;
    user = UserData;
    expect(res.statusCode).toBe(200);
    expect(UserData._id).toBeDefined();
    expect(UserData.name).toBe('frank');
    expect(UserData.email).toBe('frankthaker@test.com');
    expect(UserData.password).toBe('9003d1df22eb4d3820015070385194c8');
    expect(UserData.role).toBe('admin');
    expect(UserData.status).toBe(true);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/v1/account/login')
      .send({
        email: 'frank@test.com',
        password: 'pwd',
      });
    expect(res.statusCode).toBe(200);
  });

  it('should load a user profile', async () => {
    await login();
    const res = await request(app)
      .get('/api/v1/account/profile')
      .set('authorization', authorizationToken);
    const UserData = res.body.data;
    expect(res.statusCode).toBe(200);
    expect(UserData._id).toBeDefined();
    expect(UserData.name).toBe('frank');
    expect(UserData.email).toBe('frank@test.com');
    expect(UserData.password).toBe('9003d1df22eb4d3820015070385194c8');
    expect(UserData.role).toBe('user');
    expect(UserData.status).toBe(true);
  });

  it('should load all users profiles', async () => {
    await login();
    const res = await request(app)
      .get('/api/v1/account/users')
      .set('authorization', authorizationToken);
    const UserData = res.body.data[0];
    expect(res.statusCode).toBe(200);
    expect(UserData._id).toBeDefined();
    expect(UserData.name).toBe('frank');
    expect(UserData.email).toBe('frank@test.com');
    expect(UserData.password).toBe('9003d1df22eb4d3820015070385194c8');
    expect(UserData.role).toBe('user');
    expect(UserData.status).toBe(true);
  });

  it('should find a user profile', async () => {
    await login();
    const res = await request(app)
      .get(`/api/v1/account/users/${user._id}`)
      .set('authorization', authorizationToken);
    const UserData = res.body.data;
    expect(res.statusCode).toBe(200);
    expect(UserData._id).toBeDefined();
    expect(UserData.name).toBe('frank');
    expect(UserData.email).toBe('frank@test.com');
    expect(UserData.password).toBe('9003d1df22eb4d3820015070385194c8');
    expect(UserData.role).toBe('user');
    expect(UserData.status).toBe(true);
  });

  it('should not find a user profile because of wrong profile id [correct mongoose id]', async () => {
    await login();
    const res = await request(app)
      .get('/api/v1/account/users/507f191e810c19729de860ea')
      .set('authorization', authorizationToken);
    expect(res.statusCode).toBe(200);
  });

  it('should not find a user profile because of wrong profile id [wrong mongoose id]', async () => {
    await login();
    const res = await request(app)
      .get('/api/v1/account/users/test123')
      .set('authorization', authorizationToken);
    expect(res.statusCode).toBe(500);
  });

  it('should not delete a user profile', async () => {
    await login();
    sinon.stub(UsersModel, 'findOneAndDelete').throws(Error('db query failed'));
    const res = await request(app)
      .delete('/api/v1/account/users/123')
      .set('authorization', authorizationToken);
    expect(res.statusCode).toBe(500);
  });

  it('should not login a user because of wrong password', async () => {
    const res = await request(app)
      .post('/api/v1/account/login')
      .send({
        email: 'frank@test.com',
        password: 'wrong_pwd',
      });
    expect(res.statusCode).toBe(401);
  });

  it('should delete a user profile', async () => {
    await login();
    const res = await request(app)
      .delete(`/api/v1/account/users/${user._id.toString()}`)
      .set('authorization', authorizationToken);
    const UserData = res.body.data;
    expect(res.statusCode).toBe(200);
    expect(UserData._id).toBeDefined();
    expect(UserData.name).toBe('frank');
    expect(UserData.email).toBe('frank@test.com');
    expect(UserData.password).toBe('9003d1df22eb4d3820015070385194c8');
    expect(UserData.role).toBe('user');
    expect(UserData.status).toBe(true);
  });

  it('should load api-docs', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toBe(302);
  });
});

describe('Sad Path -> Users', () => {
  it('should not register a user', async () => {
    sinon.stub(UsersModel, 'findOneAndUpdate').throws(Error('db query failed'));
    const res = await request(app)
      .post('/api/v1/account/register')
      .send({
        name: 'frank',
        email: 'frank@test.com',
        password: 'pwd',
        role: 'user',
        status: true,
      });
    expect(res.statusCode).toBe(500);
  });

  it('should not register a user with wrong provided data', async () => {
    const res = await request(app)
      .post('/api/v1/account/register')
      .send({
        name: 'frank',
        email: 'frank@test.com',
        password: 'pwd',
        test_param: 'test_data',
      });
    const UserData = res.body.data;
    user = UserData;
    expect(res.statusCode).toBe(400);
  });

  it('should not register a user if required data is not provided', async () => { // email param is not provided here
    const res = await request(app)
      .post('/api/v1/account/register')
      .send({
        name: 'frank',
        password: 'pwd',
      });
    const UserData = res.body.data;
    user = UserData;
    expect(res.statusCode).toBe(400);
  });

  it('should not login a user because user does not exist', async () => {
    const res = await request(app)
      .post('/api/v1/account/login')
      .send({
        email: 'jarvis@test.com',
        password: 'jarvis',
      });
    expect(res.statusCode).toBe(401);
  });

  it('should not login a user because of an Error', async () => {
    sinon.stub(UsersModel, 'findOne').throws(Error('db query failed'));
    const res = await request(app)
      .post('/api/v1/account/login')
      .send({
        email: 'frank@test.com',
        password: 'pwd',
      });
    expect(res.statusCode).toBe(500);
  });

  it('should fail an api call because of CORS error', async () => {
    const res = await request(app)
      .post('/api/v1/account/login')
      .send({
        email: 'frank@test.com',
        password: 'pwd',
      }).set('Origin', 'RANDOM_ORIGIN');
    expect(res.statusCode).toBe(500);
  });

  it('should fail an api call because of authentication error', async () => {
    const res = await request(app)
      .get('/api/v1/account/profile');
    expect(res.statusCode).toBe(401);
  });

  it('should fail an api call because of invalid token error', async () => {
    const res = await request(app)
      .get('/api/v1/account/profile')
      .set('authorization', invalidToken);
    expect(res.statusCode).toBe(401);
  });

  it('should fail an api call because of expired jwt token error', async () => {
    const res = await request(app)
      .get('/api/v1/account/profile')
      .set('authorization', expiredToken);
    expect(res.statusCode).toBe(401);
  });

  it('should fail an api call because of wrong role error', async () => {
    const loginApi = await request(app)
      .post('/api/v1/account/login')
      .send({
        email: 'frankthaker@test.com',
        password: 'pwd',
      });
    adminRoleToken = loginApi.body.data.token;
    const res = await request(app)
      .get('/api/v1/account/profile')
      .set('authorization', adminRoleToken);
    expect(res.statusCode).toBe(401);
  });

  it('should fail an api call because of user is disabled', async () => {
    await UsersModel.findOneAndUpdate({ email: 'frankthaker@test.com' }, { status: false });
    const res = await request(app)
      .get('/api/v1/account/profile')
      .set('authorization', adminRoleToken);
    expect(res.statusCode).toBe(401);
  });

  it('should fail an api call because of user is deleted and token exists', async () => {
    await UsersModel.findOneAndDelete({ email: 'frankthaker@test.com' });
    const res = await request(app)
      .get('/api/v1/account/profile')
      .set('authorization', adminRoleToken);
    expect(res.statusCode).toBe(401);
  });
});
