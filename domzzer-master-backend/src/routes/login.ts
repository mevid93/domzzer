import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import config from '../utils/config';
import inputService from '../services/inputService';


const router = express.Router();

// POST api/login
router.post('/', (async (req, res) => {
  const credentials = inputService.toCredentials(req.body);
  const user = await User.findOne({ username: credentials.username });

  const passwordCorrect = (user === null || credentials.password === undefined)
    ? false
    : await bcrypt.compare(credentials.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password!'
    });
  }
  
  const userForToken = {
    username: user.username,
    userRole: user.userRole,
    // eslint-disable-next-line
    id: user._id
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });

  return res
    .status(200)
    // eslint-disable-next-line
    .send({ token, username: user.username, userRole: user.userRole, id: user._id });
}) as express.RequestHandler);

export default router;