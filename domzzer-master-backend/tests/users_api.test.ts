import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user';
import config from '../src/utils/config';
import helper from './test_helper';


jest.setTimeout(10000);

describe('/api/users', () => {

  describe('when logged in as admin', () => {
    let token: string;

    beforeEach(async () => {
      await User.deleteMany({});
      const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
      const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash });
      await user.save();
      const response = await request(app).post('/api/login').send({ username: 'rootme', password: 'sekret' });
      token = response.body.token as string;
    });

    test('should return existing users as json', async () => {
      const response = await request(app).get('/api/users').set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
    });

    test('should return all existing users', async () => {
      const response = await request(app).get('/api/users').set('authorization', `bearer ${token}`);
      const users = await helper.usersInDb();
      expect(response.body).toHaveLength(users.length);
    });

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'propro',
        userRole: 'PRO',
        password: 'salainen',
      };

      await request(app)
        .post('/api/users')
        .send(newUser)
        .set('authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const newUser = {
        username: 'propro',
        userRole: 'PRO',
        password: 'salainen',
      };

      await request(app).post('/api/users').send(newUser).set('authorization', `bearer ${token}`);
      const usersAtStart = await helper.usersInDb();
      const response = await request(app).post('/api/users').send(newUser).set('authorization', `bearer ${token}`);
      const usersAtEnd = await helper.usersInDb();

      expect(response.status).toEqual(400);
      if (response.error === false) {
        expect(response.error).not.toEqual(false);
        return;
      }

      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('User validation failed: username: field must be unique!');
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('should return 204 when deleting user with valid id', async () => {
      const newUser = {
        username: 'propro',
        userRole: 'PRO',
        password: 'salainen',
      };
      const postResponse = await request(app).post('/api/users').send(newUser).set('authorization', `bearer ${token}`);
      const usersAtStart = await helper.usersInDb();
      const response = await request(app).delete(`/api/users/${postResponse.body.id}`).set('authorization', `bearer ${token}`);
      const usersAtEnd = await helper.usersInDb();

      expect(response.status).toEqual(204);
      expect(usersAtEnd).toHaveLength(usersAtStart.length - 1);
    });

    test('should return 204 when trying to delete user with nonexisting id', async () => {
      const id = await helper.nonExistingUserId();
      const response = await request(app).delete(`/api/users/${id}`).set('authorization', `bearer ${token}`);

      expect(response.status).toEqual(204);
    });

    test('should return 400 when trying to delete user with invalid id', async () => {
      const response = await request(app).delete('/api/users/NotSovalidID1234').set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(400);
    });

    test('update succeeds with valid user and user data', async () => {
      const users = await helper.usersInDb();
      const userToBeUpdated = users[0];
      const newUserData = { ...userToBeUpdated, password: 'jotain123', userRole: 'LITE' };
      const response = await request(app)
        .put(`/api/users/${userToBeUpdated.id}`)
        .send(newUserData).set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body.userRole).toEqual('LITE');
      expect(response.body.userRole).not.toEqual(userToBeUpdated.userRole);
    });

    test('update should fail with valid user and invalid data', async () => {
      const users = await helper.usersInDb();
      const userToBeUpdated = users[0];
      const newUserData = { ...userToBeUpdated, password: '', userRole: 'LITE' };
      const response = await request(app)
        .put(`/api/users/${userToBeUpdated.id}`)
        .send(newUserData)
        .set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(400);
      if (response.error === false) {
        expect(response.error).not.toEqual(false);
        return;
      }

      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('Validation failed: password: field length must be at least 5 characters!');
    });
  });

  describe('when not logged in as admin', () => {
    let token: string;

    beforeEach(async () => {
      await User.deleteMany({});
      const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
      const user = new User({ username: 'rootme', userRole: 'PRO', passwordHash });
      await user.save();
      const response = await request(app).post('/api/login').send({ username: 'rootme', password: 'sekret' });
      token = response.body.token as string;
    });

    test('should return 401 when trying to get all users', async () => {
      const response = await request(app).get('/api/users').set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(401);
    });

    test('should return correct error message when trying to get all users', async () => {
      const response = await request(app).get('/api/users').set('authorization', `bearer ${token}`);
      if (response.error === false) {
        expect(response.error).not.toEqual(false);
        return;
      }

      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('Insufficient privileges to complete the operation!');
    });

    test('should return 401 when trying to delete user with valid id', async () => {
      const users = await helper.usersInDb();
      const response = await request(app)
        .delete(`/api/users/${users[0].id}`)
        .set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(401);
    });

    test('should return correct error message when trying to delete user with valid id', async () => {
      const users = await helper.usersInDb();
      const response = await request(app)
        .delete(`/api/users/${users[0].id}`)
        .set('authorization', `bearer ${token}`);
      if (response.error === false) {
        expect(response.error).not.toEqual(false);
        return;
      }

      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('Insufficient privileges to complete the operation!');
    });

    test('should return 401 when trying to get some other users information with valid id', async () => {
      const passwordHash = await bcrypt.hash('othersekret', config.SALT_ROUNDS);
      const user = new User({ username: 'otheraccount', userRole: 'PRO', passwordHash });
      const saved = await user.save();
      const response = await request(app).get(`/api/users/${saved._id}`).set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(401);
    });

    test('should return 200 when getting users own information with valid id', async () => {
      const users = await helper.usersInDb();
      const currentUser = users.find(u => u.username === 'rootme');
      if (currentUser === undefined) {
        expect(currentUser).not.toBeUndefined();
        return;
      }
      const response = await request(app).get(`/api/users/${currentUser.id}`).set('authorization', `bearer ${token}`);
      expect(response.status).toEqual(200);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close(true);
});