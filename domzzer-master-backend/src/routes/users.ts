import express from 'express';
import bcrypt from 'bcrypt';
import config from '../utils/config';
import User from '../models/user';
import privilegesService from '../services/privilegesService';
import inputService from '../services/inputService';
import { CustomRequest } from '../types/types';


const router = express.Router();

// GET api/users
router.get('/', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkAdminPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const users = await User.find({});
  return res.json(users);
}) as express.RequestHandler);

// POST api/users
router.post('/', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkAdminPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const newUser = inputService.toNewUser(req.body);
  const passwordError = checkPasswordLength(newUser.password);
  if (passwordError || newUser.password === undefined) {
    return res.status(400).json({ error: passwordError });
  }

  const passwordHash = await bcrypt.hash(newUser.password, config.SALT_ROUNDS);
  const user = new User({
    username: newUser.username,
    userRole: newUser.userRole,
    passwordHash,
  });

  const savedUser = await user.save();
  return res.json(savedUser);
}) as express.RequestHandler);

// GET api/users/{id}
router.get('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkTokenMatchesUserId(req.token, req.params.id);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const user = await User.findById(req.params.id);
  return res.json(user);
}) as express.RequestHandler);

// DELETE api/users/{id}
router.delete('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkAdminPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  await User.findByIdAndRemove(req.params.id);
  return res.status(204).end();
}) as express.RequestHandler);

// PUT api/users/{id}
router.put('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkTokenMatchesUserId(req.token, req.params.id);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const updateUser = inputService.toUpdateUser(req.body);
  const passwordError = checkPasswordLength(updateUser.password);
  if (passwordError || updateUser.password === undefined) {
    return res.status(400).json({ error: passwordError });
  }

  const passwordHash = await bcrypt.hash(updateUser.password, config.SALT_ROUNDS);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { ...updateUser, passwordHash },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );
  return res.json(user);
}) as express.RequestHandler);

const checkPasswordLength = (password: string | undefined): string | undefined => {
  if (password === null || password === undefined || password.length < 5) {
    return 'Validation failed: password: field length must be at least 5 characters!';
  }

  return undefined;
};

export default router;