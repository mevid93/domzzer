import { NextFunction, Request, Response } from 'express';
import { CustomRequest } from '../types/types';
import logger from './logger';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {

  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'MongooseServerSelectionError') {
    return res.status(500).send({ error: 'database unavailable' });
  }

  if (error.name === 'MongooseError') {
    return res.status(500).send({ error: 'database error' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' });
  }

  return next(error);
};


const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (req: CustomRequest, _res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};