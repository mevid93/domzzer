import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user';
import config from '../src/utils/config';
import { Credentials } from '../src/types/types';


jest.setTimeout(10000);

describe('/api/login', () => {

  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash });
    await user.save();
  });

  test('should allow login with valid credentials', async () => {
    const credentials: Credentials = { username: 'rootme', password: 'sekret' };
    const response = await request(app).post('/api/login').send(credentials);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });

  test('should return 401 with invalid credentials', async () => {
    const credentials: Credentials = { username: 'rootme', password: 'sret' };
    const response = await request(app).post('/api/login').send(credentials);
    expect(response.status).toEqual(401);
  });

  test('should return correct error message with invalid credentials', async () => {
    const credentials: Credentials = { username: 'rootme', password: 'sret' };
    const response = await request(app).post('/api/login').send(credentials);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
    } else {
      
      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('Invalid username or password!');
    }
  });
});

afterAll(async () => {
  await mongoose.connection.close(true);
});