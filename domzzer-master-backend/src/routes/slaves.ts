import express from 'express';
import aes256 from '../services/aesCryptoService';
import privilegesService from '../services/privilegesService';
import inputService from '../services/inputService';
import Slave from '../models/slave';
import { CustomRequest } from '../types/types';


const router = express.Router();

// GET api/slaves
router.get('/', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkLitePrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const slaves = await Slave.find({}).lean();
  const mappedSlaves = slaves.map(s => {
    const object = {
      id: s._id,
      name: s.name,
      address: s.address,
      username: s.username,
      password: aes256.decrypt(s.password),
      status: s.status,
      testsDone: s.testsDone,
      vulnerabilitiesFound: s.vulnerabilitiesFound
    };
    return object;
  });
  return res.json(mappedSlaves);
}) as express.RequestHandler);

// POST api/slaves
router.post('/', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkProPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const newSlave = inputService.toNewSlave(req.body);

  const slave = new Slave({
    name: newSlave.name,
    address: newSlave.address,
    status: 'OFFLINE',
    testsDone: 0,
    vulnerabilitiesFound: 0,
    username: newSlave.username,
    password: newSlave.password !== undefined ? aes256.encrypt(newSlave.password): undefined,
  });

  const savedSlave = await slave.save();
  return res.json({ ...savedSlave, password: aes256.decrypt(savedSlave.password) });
}) as express.RequestHandler);

// POST api/slaves/{id}
router.get('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkLitePrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const s = await Slave.findById(req.params.id).lean();
  const slave = s ? {
    id: s._id,
    name: s.name,
    address: s.address,
    username: s.username,
    password: aes256.decrypt(s.password),
    status: s.status,
    testsDone: s.testsDone,
    vulnerabilitiesFound: s.vulnerabilitiesFound
  } : null;
  return res.json(slave);
}) as express.RequestHandler);

// PUT api/slaves/{id}
router.put('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkProPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const slave = inputService.toUpdateSlave(req.body);
  if (slave.username !== undefined && slave.username.length !== 0 && slave.username.length < 5) {
    return res.status(400).json({ error: 'Slave validation failed: username: field length must be at least 5 characters!' });
  }
  if (slave.username !== undefined && slave.username.length !== 0 && (slave.password === undefined || slave.password.length === 0)) {
    return res.status(400).json({ error: 'Slave validation failed: password: field is required when username is defined!' });
  }
  if (slave.password !== undefined && slave.password.length !== 0 && slave.password.length < 5) {
    return res.status(400).json({ error: 'Slave validation failed: password: field length must be at least 5 characters!' });
  }
  if (slave.password !== undefined && slave.password.length !== 0 && (slave.username === undefined || slave.username.length === 0)) {
    return res.status(400).json({ error: 'Slave validation failed: username: field is required when password is defined!' });
  }

  const s = await Slave.findByIdAndUpdate(
    req.params.id,
    { ...slave, password: slave.password !== undefined ? aes256.encrypt(slave.password) : undefined},
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  ).lean();

  const updatedSlave = s ? {
    id: s._id,
    name: s.name,
    address: s.address,
    username: s.username,
    password: aes256.decrypt(s.password),
    status: s.status,
    testsDone: s.testsDone,
    vulnerabilitiesFound: s.vulnerabilitiesFound
  } : null;

  return res.json(updatedSlave);
}) as express.RequestHandler);

// DELETE api/slaves/{id}
router.delete('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkProPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  await Slave.findByIdAndRemove(req.params.id);
  return res.status(204).end();
}) as express.RequestHandler);

export default router;