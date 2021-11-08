import app from './app';
import * as http from 'http';

import logger from './utils/logger';
import config from './utils/config';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`domzzer-master-backend listening on port ${config.PORT}`);
});