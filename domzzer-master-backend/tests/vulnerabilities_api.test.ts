import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import request from 'supertest';
import app from '../src/app';
import config from '../src/utils/config';
import User from '../src/models/user';
import Vulnerability from '../src/models/vulnerability';
import helper from './test_helper';
import { TransformedSlave } from '../src/types/types';


jest.setTimeout(10000);

describe('/api/vulnerabilities', () => {
  let token: string;

  beforeAll(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash });
    await user.save();
    const response = await request(app).post('/api/login').send({ username: 'rootme', password: 'sekret' });
    token = response.body.token as string;
  });

  beforeEach(async () => {
    await Vulnerability.deleteMany({});
    await Vulnerability.insertMany(helper.initialVulnerabilities);
  });

  test('should return existing vulnerabilities as json', async () => {
    const response = await request(app).get('/api/vulnerabilities').set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
  });

  test('should return all existing vulnerabilities', async () => {
    const response = await request(app).get('/api/vulnerabilities').set('authorization', `bearer ${token}`);
    expect(response.body).toHaveLength(helper.initialVulnerabilities.length);
  });
});

describe('/api/vulnerabilities/:id', () => {
  let token: string;

  beforeAll(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS);
    const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash });
    await user.save();
    const response = await request(app).post('/api/login').send({ username: 'rootme', password: 'sekret' });
    token = response.body.token as string;
  });

  beforeEach(async () => {
    await Vulnerability.deleteMany({});
    await Vulnerability.insertMany(helper.initialVulnerabilities);
  });

  test('should return existing vulnerability when trying to get with valid id', async () => {
    const response = await request(app).get('/api/vulnerabilities').set('authorization', `bearer ${token}`);
    const vulnerabilities = response.body as TransformedSlave[];
    const vulnerabilityToView = vulnerabilities[0];
    const resultVulnerability = await request(app)
      .get(`/api/vulnerabilities/${vulnerabilityToView.id}`)
      .set('authorization', `bearer ${token}`)
      .then(response => response.body as TransformedSlave);
    expect(vulnerabilityToView).toEqual(resultVulnerability);
  });

  test('should return null when trying to get nonexisting vulnerability', async () => {
    const id = await helper.nonExistingVulnerabilityId();
    const response = await request(app).get(`/api/vulnerabilities/${id}`).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(null);
  });

  test('should return 400 when trying to get vulnerability with invalid id', async () => {
    const response = await request(app).get('/api/vulnerabilities/NotSoValidID123').set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return correct error message when trying to get vulnerability with invalid id', async () => {
    const response = await request(app).get('/api/vulnerabilities/NotSoValidID123').set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
      return;
    }

    const errorText = JSON.parse(response.error.text).error as string;
    expect(errorText).toEqual('malformatted id');
  });

  test('should delete existing vulnearbility when id is valid', async () => {
    const vulnerabilitiesBefore = await request(app)
      .get('/api/vulnerabilities')
      .set('authorization', `bearer ${token}`)
      .then(response => response.body as TransformedSlave[]);
    const id = vulnerabilitiesBefore[0].id;
    const response = await request(app).delete(`/api/vulnerabilities/${id}`).set('authorization', `bearer ${token}`);
    const vulnerabilitiesAfter = await request(app)
      .get('/api/vulnerabilities')
      .set('authorization', `bearer ${token}`)
      .then(response => response.body as TransformedSlave[]);
    const vulnerability = vulnerabilitiesAfter.find(v => v.id === id);
    expect(response.status).toEqual(204);
    expect(vulnerability).not.toBeDefined();
  });

  test('should return 204 when trying to delete nonexisting vulnerability', async () => {
    const id = await helper.nonExistingVulnerabilityId();
    const response = await request(app).delete(`/api/vulnerabilities/${id}`).set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(204);
  });

  test('should return 400 when trying to delete vulnerability with invalid id', async () => {
    const response = await request(app).delete('/api/vulnerabilities/NotSoValidId123').set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return correct error message when trying to delete vulnerability with invalid id', async () => {
    const response = await request(app).delete('/api/vulnerabilities/NotSoValidId123').set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
      return;
    }

    const errorText = JSON.parse(response.error.text).error as string;
    expect(errorText).toEqual('malformatted id');
  });

  test('should update existing vulnerability when id is valid and update information is valid', async () => {
    const vulnerabilities = await helper.vulnerabilitiesInDb();
    const { id, ...vulnerability } = vulnerabilities[0];
    const updatedVulnerability = { ...vulnerability, status: 'CLOSED' };
    const response = await request(app)
      .put(`/api/vulnerabilities/${id}`)
      .send(updatedVulnerability)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual('CLOSED');
  });

  test('should return 400 when vulnerability id is valid and update information is invalid', async () => {
    const vulnerabilities = await helper.vulnerabilitiesInDb();
    const { id, ...vulnerability } = vulnerabilities[0];
    const updatedVulnerability = { ...vulnerability, status: 'not supported status' };
    const response = await request(app)
      .put(`/api/vulnerabilities/${id}`)
      .send(updatedVulnerability)
      .set('authorization', `bearer ${token}`);
    expect(response.status).toEqual(400);
  });

  test('should return correct error message when vulnerability id is valid and update contains invalid status', async () => {
    const vulnerabilities = await helper.vulnerabilitiesInDb();
    const { id, ...vulnerability } = vulnerabilities[0];
    const updatedVulnerability = { ...vulnerability, status: 'NOT SUPPORTED' };
    const response = await request(app)
      .put(`/api/vulnerabilities/${id}`)
      .send(updatedVulnerability)
      .set('authorization', `bearer ${token}`);
    if (response.error === false) {
      expect(response.error).not.toEqual(false);
      return;
    }

    const errorText = JSON.parse(response.error.text).error as string;
    expect(errorText).toEqual('Validation failed: status: `NOT SUPPORTED` is not a valid enum value for path `status`.');
  });
});

afterAll(async () => {
  await mongoose.connection.close(true);
});