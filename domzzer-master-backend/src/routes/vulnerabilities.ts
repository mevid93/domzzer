import express from 'express';
import Vulnerability from '../models/vulnerability';
import privilegesService from '../services/privilegesService';
import inputService from '../services/inputService';
import { CustomRequest } from '../types/types';

const router = express.Router();

// GET api/vulnerabilities
router.get('/', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkLitePrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const vulnerabilities = await Vulnerability.find({});
  return res.json(vulnerabilities);
}) as express.RequestHandler);

// GET api/vulnerabilities/{id}
router.get('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkLitePrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const vulnerability = await Vulnerability.findById(req.params.id);
  return res.json(vulnerability);
}) as express.RequestHandler);

// PUT api/vulnerabilities/{id}
router.put('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkLitePrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  const updateVulnerability = inputService.toUpdateVulnerability(req.body);
  const updatedVulnerability = await Vulnerability.findByIdAndUpdate(
    req.params.id,
    updateVulnerability,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );
  return res.json(updatedVulnerability);
}) as express.RequestHandler);

// DELETE api/vulnerabilities/{id}
router.delete('/:id', (async (req: CustomRequest, res) => {
  const error = privilegesService.checkProPrivileges(req.token);
  if (error) {
    return res.status(401).json({ error: error });
  }

  await Vulnerability.findByIdAndRemove(req.params.id);
  return res.status(204).end();
}) as express.RequestHandler);

export default router;