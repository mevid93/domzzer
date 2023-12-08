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

const app: Application = express();
app.use(express.json());
app.use(cors());

// MONGODB_URI is promise in test environment, 
// so it needs to be resolved before it can be used.
Promise.resolve(config.MONGODB_URI).then((resolvedUri) => {
  logger.info('connecting to', resolvedUri);

  mongoose.set('runValidators', true);
  mongoose.set('strictQuery', false);
  mongoose.connect(resolvedUri)
    .then(() => {
      logger.info('connected to MongoDB');
    })
    .catch((error) => {
      logger.error('error when tried to connect MongoDB:', error.message);
    });
}).catch((error) => {
  throw Error(`Failed to connect MongoDb: ${error}`);
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