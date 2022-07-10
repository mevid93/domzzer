import express from 'express';
import Slave from '../models/slave';
import Vulnerability from '../models/vulnerability';
import serverInfoService from '../services/serverInfoService';
import privilegesService from '../services/privilegesService';
import { CustomRequest } from '../types/types';

const router = express.Router();

// GET api/info
router.get('/', (async (req: CustomRequest, res, next) => {
  const error = privilegesService.checkLitePrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const numberOfVulnerabilities = await Vulnerability.countDocuments({});

  Slave.countDocuments({})
    .then(count => {
      const info = serverInfoService.getSystemInformation();
      const details = {
        'numberOfPotentialVulnerabilities': numberOfVulnerabilities,
        'numberOfSlaves': count,
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
}) as express.RequestHandler);

export default router;