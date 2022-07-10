import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../src/app';
import helper from './test_helper';
import SlaveModel from '../src/models/slave';
import UserModel from '../src/models/user';
import config from '../src/utils/config';
import { TransformedSlave } from '../src/types/types';


jest.setTimeout(10000);

describe('/api/slaves', () => {
  let token: string;

  beforeAll(async () => {
    await UserModel.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new UserModel({ username: 'rootme', userRole: 'ADMIN', passwordHash });
    await user.save();
    const response = await request(app).post('/api/login').send({ username: 'rootme', password: 'sekret' });
    token = response.body.token as string;
  });

  beforeEach(async () => {
    await SlaveModel.deleteMany({});
    await SlaveModel.insertMany(helper.initialSlaves);
  });

  test('should return existing slaves as json', async () => {
    const response = await request(app).get('/api/slaves').set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });

  test('should return all existing slaves', async () => {
    const response = await request(app).get('/api/slaves').set('authorization', `bearer ${token}`);
    expect(response.body).toHaveLength(helper.initialSlaves.length);
  });

  test('should return 401 when adding slave to database with insufficient privileges', async () => {
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new UserModel({ username: 'noobster', userRole: 'LITE', passwordHash });
    await user.save();
    const r = await request(app).post('/api/login').send({ username: 'noobster', password: 'sekret' });
    const newtoken = r.body.token as string;
    const newSlave = {
      name: 'SlaveMachine3',
      address: 'http://127.0.0.1:1003',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      username: 'User3',
      password: 'Password3'
    };
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${newtoken}`);
    expect(response.status).toEqual(401);
  });

  test('should add slave to database when posted information contains all required fields', async () => {
    const newSlave = {
      name: 'SlaveMachine3',
      address: 'http://127.0.0.1:1003',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      username: 'User3',
      password: 'Password3'
    };
    const slavesBefore = await helper.slavesInDb();
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    const slavesAfter = await helper.slavesInDb();
    expect(response.status).toEqual(200);
    expect(slavesBefore.length).toEqual(slavesAfter.length - 1);
  });

  test('should return 400 when posted information is missing required fields', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    };
    const slavesBefore = await helper.slavesInDb();
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    const slavesAfter = await helper.slavesInDb();
    expect(response.status).toEqual(400);
    expect(slavesBefore.length).toEqual(slavesAfter.length);
  });

  test('should return correct error message when posted information is missing required address field', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    };
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
      return;
    }

    const errorText = JSON.parse(response.error.text).error as string;
    expect(errorText).toEqual('Slave validation failed: address: field is required!');
  });

  test('should return 400 when posted information contains name that already exists', async () => {
    const slaves = await helper.slavesInDb();
    const newSlave = {
      name: slaves[0].name,
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    };
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return correct error message when posted information contains name that already exists', async () => {
    const slaves = await helper.slavesInDb();
    const newSlave = {
      name: slaves[0].name,
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    };
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
    } else {
      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('Slave validation failed: name: field must be unique!');
    }
  });

  test('should return 400 when posted information contains username but no password', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      username: 'user4',
    };
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return 400 when posted information contains password but no username', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      password: 'YOLOadmin'
    };
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
    } else {
      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('Slave validation failed: username: field is required when password is defined!');
    }
  });

  test('should return correct error message when posted information contains password but no username', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      password: 'YOLOadmin'
    };
    const response = await request(app).post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
    } else {
      const errorText = JSON.parse(response.error.text).error as string;
      expect(errorText).toEqual('Slave validation failed: username: field is required when password is defined!');
    }
  });
});

describe('/api/slaves/:id', () => {
  let token: string;

  beforeAll(async () => {
    await UserModel.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new UserModel({ username: 'rootme', userRole: 'ADMIN', passwordHash });
    await user.save();
    const response = await request(app).post('/api/login').send({ username: 'rootme', password: 'sekret' });
    token = response.body.token as string;
  });

  beforeEach(async () => {
    await SlaveModel.deleteMany({});
    await SlaveModel.insertMany(helper.initialSlaves);
  });

  test('should return existing slave when trying to get with valid id', async () => {
    const response = await request(app).get('/api/slaves').set('authorization', `bearer ${token}`);
    const slaveToView = response.body[0] as TransformedSlave;
    const resultSlave = await request(app)
      .get(`/api/slaves/${slaveToView.id}`)
      .set('authorization', `bearer ${token}`)
      .then((response: request.Response) => response.body as TransformedSlave);
    expect(slaveToView).toEqual(resultSlave);
  });

  test('should return null when trying to get nonexisting slave', async () => {
    const id = await helper.nonExistingSlaveId();
    const response = await request(app).get(`/api/slaves/${id}`).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(null);
  });

  test('should return 400 when trying to get with invalid id', async () => {
    const response = await request(app).get('/api/slaves/NotSoValidID123').set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return correct error message when trying to get with invalid id', async () => {
    const response = await request(app).get('/api/slaves/NotSoValidID123').set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
      return;
    }

    const errorText = JSON.parse(response.error.text).error as string;
    expect(errorText).toEqual('malformatted id');
  });

  test('should delete existing slave when id is valid', async () => {
    const slavesBefore: TransformedSlave[] = await request(app)
      .get('/api/slaves')
      .set('authorization', `bearer ${token}`)
      .then((response: request.Response) => response.body as TransformedSlave[]);
    const id = slavesBefore[0].id;
    const response = await request(app).delete(`/api/slaves/${id}`).set('authorization', `bearer ${token}`);
    const slavesAfter = await request(app)
      .get('/api/slaves')
      .set('authorization', `bearer ${token}`)
      .then(response => response.body as TransformedSlave[]);
    const slave = slavesAfter.find(s => s.id === id);
    expect(response.status).toEqual(204);
    expect(slave).not.toBeDefined();
  });

  test('should return 204 when trying to delete nonexisting slave', async () => {
    const id = await helper.nonExistingSlaveId();
    const response = await request(app).delete(`/api/slaves/${id}`).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(204);
  });

  test('should return 400 when trying to delete with invalid id', async () => {
    const response = await request(app).delete('/api/slaves/NotSoValidId123').set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return correct error message when trying to delete with invalid id', async () => {
    const response = await request(app).delete('/api/slaves/NotSoValidId123').set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
      return;
    }

    const errorText = JSON.parse(response.error.text).error as string;
    expect(errorText).toEqual('malformatted id');
  });

  test('should update existing slave when id is valid and update information is valid', async () => {
    const slaves = await helper.slavesInDb();
    const { id, ...slave } = slaves[0];
    const updatedSlave = { ...slave, name: 'UpdatedName1' };
    const response = await request(app).put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('UpdatedName1');
  });

  test('should return 401 when updating existing slave with insufficient privileges', async () => {
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new UserModel({ username: 'noobster', userRole: 'LITE', passwordHash });
    await user.save();
    const r = await request(app).post('/api/login').send({ username: 'noobster', password: 'sekret' });
    const newtoken = r.body.token as string;
    const slaves = await helper.slavesInDb();
    const { id, ...slave } = slaves[0];
    const updatedSlave = { ...slave, name: 'UpdatedName1' };
    const response = await request(app).put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${newtoken}`);
    expect(response.status).toEqual(401);
  });

  test('should return 400 when id is valid and update information is invalid', async () => {
    const slaves = await helper.slavesInDb();
    const { id, ...slave } = slaves[0];
    const updatedSlave = { ...slave, name: '12' };
    const response = await request(app).put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return correct error message when id is valid and update contains invalid name', async () => {
    const slaves = await helper.slavesInDb();
    const { id, ...slave } = slaves[0];
    const updatedSlave = { ...slave, name: '12' };
    const response = await request(app).put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
      return;
    }

    const errorText = JSON.parse(response.error.text).error as string;
    expect(errorText).toEqual('Validation failed: name: field length must be at least 3 characters!');
  });
});

afterAll(async () => {
  await mongoose.connection.close(true);
});