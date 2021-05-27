require('dotenv').config();

let authorizationToken;

const {
  test,
  expect,
  describe,
  beforeAll,
  afterAll,
} = require('@jest/globals');
const request = require('supertest');

const dbConn = require('../../connection/db.connect');
const app = require('../../app');

const UserData = {
  name: 'Franklin',
  email: 'Jarvisfranklinthaker@gmail.com'.toLocaleLowerCase(),
  password: 'Testing@123',
};

beforeAll(async () => {
  try {
    await dbConn.connect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

describe('API Integration Testing...', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect

  test('Register...', async () => {
    const response = await request(app)
      .post('/api/v1/account/register')
      .send(UserData);

    const { data } = response.body;

    UserData._id = data._id;
    expect(response.statusCode).toBe(200);
    expect(data._id).toBeDefined();
    expect(data.name).toBe(UserData.name);
    expect(data.email).toBe(UserData.email);
    expect(data.password).toBeDefined();
  });

  test('Login...', async () => {
    const response = await request(app)
      .post('/api/v1/account/login')
      .send({
        email: UserData.email,
        password: UserData.password,
      });
    authorizationToken = response.body.data.encryptedToken;
    expect(response.statusCode).toBe(200);
  });

  test('Profile...', async () => {
    const response = await request(app)
      .get('/api/v1/account/profile')
      .set('authorization', authorizationToken);
    expect(response.statusCode).toBe(200);
  });

  test('Get All Data...', async () => {
    const response = await request(app)
      .get('/api/v1/account/users')
      .set('authorization', authorizationToken);
    expect(response.statusCode).toBe(200);
  });

  test('Find By Id...', async () => {
    const response = await request(app)
      .get(`/api/v1/account/users/${UserData._id}`)
      .set('authorization', authorizationToken);
    expect(response.statusCode).toBe(200);
  });

  test('Delete By Id...', async () => {
    const response = await request(app)
      .delete(`/api/v1/account/users/${UserData._id}`)
      .set('authorization', authorizationToken);
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async () => {
  try {
    await dbConn.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
