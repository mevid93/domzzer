import express, { Application } from 'express';
require('express-async-errors');
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config';
import middleware from './utils/middleware';
import logger from './utils/logger';
import configurationService from './services/configurationService';
import infoRouter from './routes/info';
import loginRouter from './routes/login';
import settingsRouter from './routes/settings';
import slavesRouter from './routes/slaves';
import usersRouter from './routes/users';
import vulnerabilitiesRouter from './routes/vulnerabilities';

const app:Application = express();
app.use(express.json());
app.use(cors());

logger.info('connecting to', config.MONGODB_URI);

mongoose.set('runValidators', true);
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error when tried to connect MongoDB:', error.message);
  });

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/settings', settingsRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/info', infoRouter);
app.use('/api/slaves', slavesRouter);
app.use('/api/vulnerabilities', vulnerabilitiesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

configurationService.configure()
  .then(() => {
    logger.info('configuration service run successfully');
  })
  .catch((error) => {
    logger.error('error when running configuration service:', error.message);
  });

export default app;