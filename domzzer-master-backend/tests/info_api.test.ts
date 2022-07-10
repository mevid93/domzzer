import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user';
import config from '../src/utils/config';


jest.setTimeout(10000);

describe('/api/info', () => {
  let response: request.Response;

  beforeAll(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash });
    await user.save();
    const loginInfo = await request(app).post('/api/login').send({ username: 'rootme', password: 'sekret' });
    response = await request(app).get('/api/info').set('authorization', `bearer ${loginInfo.body.token}`);
  });

  test('should return info as json', () => {
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });

  test('should return json which contains server name', () => {
    expect(response.body.serverName).toBeDefined();
  });

  test('should return json which contains server OS', () => {
    expect(response.body.serverType).toBeDefined();
  });

  test('should return json which contains server OS-version', () => {
    expect(response.body.serverVersion).toBeDefined();
  });

  test('should return json which contains server memory', () => {
    expect(response.body.serverMemoryMb).toBeDefined();
  });

  test('should return json which contains server date', () => {
    expect(response.body.serverDate).toBeDefined();
  });

  test('should return json which contains server uptime', () => {
    expect(response.body.serverUptime).toBeDefined();
  });

  test('should return json which contains number of server controlled slave machines', () => {
    expect(response.body.numberOfSlaves).toBeDefined();
  });

  test('should return json which contains number of potential vulnerabilities found', () => {
    expect(response.body.numberOfPotentialVulnerabilities).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close(true);
});