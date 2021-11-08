import express from 'express';
import Slave from '../models/slave';
import serverInfoService from '../services/serverInfoService';
import privilegesService from '../services/privilegesService';
import { CustomRequest } from '../types/types';

const router = express.Router();
const numberOfVulnerabilities = 0;
const numberOfTestsPerformed = 0;

// GET api/info
router.get('/', (req: CustomRequest, res, next) => {
  const error = privilegesService.checkLitePrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  Slave.countDocuments({})
    .then(count => {
      const info = serverInfoService.getSystemInformation();
      const details = {
        'numberOfPotentialVulnerabilities': numberOfVulnerabilities,
        'numberOfSlaves': count,
        'numberOfTestsPerformed': numberOfTestsPerformed,
        'serverDate': info.time,
        'serverMemoryMb': info.serverMemoryMb,
        'serverName': info.hostname,
        'serverType': info.serverType,
        'serverUptime': info.uptime,
        'serverVersion': info.serverVersion,
      };
      return res.send(details);
    }).catch(error => next(error));

  return;
});

export default router;