import express from 'express';
import privilegesService from '../services/privilegesService';
import pollingService from '../services/pollingService';
import inputService from '../services/inputService';
import { CustomRequest } from '../types/types';


const router = express.Router();

// GET api/settings
router.get('/', (req: CustomRequest, res) => {
  const error = privilegesService.checkAdminPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const isPolling = pollingService.isPolling();
  const pollInterval = pollingService.getPollingInterval();
  return res.status(200).json({ isPolling, pollInterval });
});

// PUT api/settings
router.put('/', (req: CustomRequest, res) => {
  const error = privilegesService.checkAdminPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const pollInterval = inputService.toPollInverval(req.body);
  if (pollInterval === undefined) {
    return res.status(400).json({ error: 'Error: polling interval must be defined!' });
  }
  
  const wasPollingBefore = pollingService.isPolling();
  pollingService.stopPolling();
  pollingService.setPollingInterval(Number(pollInterval));
  if (wasPollingBefore) {
    pollingService.startPolling();
  }
  
  const interval = pollingService.getPollingInterval();
  return res.status(200).json({ isPolling: wasPollingBefore, pollInterval: interval });
});

// POST api/settings/start
router.post('/start', (req: CustomRequest, res) => {
  const error = privilegesService.checkAdminPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  if (!pollingService.isPolling()) {
    pollingService.startPolling();
  }

  return res.status(200).end();
});

// POST api/settings/stop
router.post('/stop', (req: CustomRequest, res) => {
  const error = privilegesService.checkAdminPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  if (pollingService.isPolling()) {
    pollingService.stopPolling();
  }

  return res.status(200).end();
});

export default router;