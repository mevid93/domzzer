import axios, { AxiosResponse } from 'axios';
import Slave from '../models/slave';
import Vulnerability from '../models/vulnerability';
import aes256 from '../services/aesCryptoService';
import inputService from '../services/inputService';
import { NewVulnerability } from '../types/types';
import logger from '../utils/logger';

let ID: NodeJS.Timeout | undefined;
let POLL_INTERVAL = 10;
let POLL_FLAG = false;

const pollSlaves = async () => {
  try {
    POLL_FLAG = true;
    logger.info('Started polling cycle');

    const slaves = await Slave.find({}).lean();
    const loginPromises: Promise<AxiosResponse>[] = [];
    const vulnerabilityPromises: Promise<AxiosResponse>[] = [];
    const addressesOfServersOnline: string[] = [];
    const tokensForServersOnline: string[] = [];

    if (!POLL_FLAG) {
      return;
    }

    logger.info('Logging to slaves...');
    slaves.forEach(slave => {
      // create address where to poll
      const address = slave.address.slice(-1) == '/' ? slave.address : slave.address + '/';
      const username = slave.username;
      const password = slave.password !== undefined ? aes256.decrypt(slave.password) : '';

      // try login to slave
      const login = axios.post(`${address}api/login`, { username, password });
      loginPromises.push(login);
    });

    if (!POLL_FLAG) {
      return;
    }

    // once all requests are done, check the status of each request.
    // if response was rejected, then set status of the slave to be offline
    // if response was fulfilled, then set the status to be online and poll vulnerabilities
    logger.info('Retrieving vulnerability info from slaves...');
    let index = 0;
    await Promise.allSettled(loginPromises).then((responses) => {
      responses.forEach((response: PromiseSettledResult<AxiosResponse>) => {
        const slave = slaves[index];
        const address = slave.address.slice(-1) == '/' ? slave.address : slave.address + '/';

        if (response.status == 'fulfilled') {
          void setSlaveStatus(slave._id.toString(), 'ONLINE');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const token: string = response.value.data;
          const vulnerabilities = axios.get(`${address}api/vulnerabilities`, {
            headers: { Authorization: 'Bearer ' + token }
          });
          vulnerabilityPromises.push(vulnerabilities);
          addressesOfServersOnline.push(address);
          tokensForServersOnline.push(token);
        } else {
          void setSlaveStatus(slave._id.toString(), 'OFFLINE');
        }
        index += 1;
      });
    }).catch((error) => logger.error(error));

    if (!POLL_FLAG) {
      return;
    }

    // once all requests to retrieve vulnerabilities have been done, check the status of each request
    // if response was rejected --> ignore it
    // if response was fullfilled, check if any vulnerabilities were returned
    // if no vulnerabilities were returned --> move to next response
    // if vulnerabilities were found --> then save them to the database, and remove them from the slave
    logger.info('Process retrieved vulnerabilities...');
    index = 0;
    await Promise.allSettled(vulnerabilityPromises).then((responses) => {
      responses.forEach((response: PromiseSettledResult<AxiosResponse>) => {
        if (response.status === 'fulfilled' && response.value.data instanceof Array
          && response.value.data.length > 0) {
          const address = addressesOfServersOnline[index];
          const token = tokensForServersOnline[index];
          response.value.data.forEach(data => {
            const newVulnerability = inputService.toNewVulnerability(data);
            newVulnerability.serverAddress = address;
            saveNewVulnerability(newVulnerability).then((wasSaved) => {
              if (!wasSaved) {
                return;
              }

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const apiId = data.id;
              void axios.delete(`${address}api/vulnerabilities/${apiId}`, {
                headers: { Authorization: 'Bearer ' + token }
              });
            }).catch((error) => logger.error(error));
          });
        }
        index += 1;
      });
    }).catch((error) => logger.error(error));

    logger.info('Completed polling cycle');
  
  } catch (error) {
    // some unknown error happened --> log it
    logger.error('Critical error in slave polling!');
    logger.error(error);
  }
};

const setSlaveStatus = async (id: string, newStatus: 'ONLINE' | 'OFFLINE') => {
  await Slave.findByIdAndUpdate(id, { status: newStatus });
};

const saveNewVulnerability = async (newVulnerability: NewVulnerability): Promise<boolean> => {
  const vulnerability = new Vulnerability({
    serverAddress: newVulnerability.serverAddress,
    targetBrowser: newVulnerability.targetBrowser,
    timestamp: newVulnerability.timestamp,
    status: newVulnerability.status,
    payload: newVulnerability.payload,
  });

  try {
    await vulnerability.save();
    return true;
  } catch (error) {
    logger.error("ERROR: SlaveAPI returned invalid data!");
    logger.error(error);
    return false;
  }
};

const stopPolling = () => {
  if (ID !== undefined) {
    clearInterval(ID);
    ID = undefined;
    logger.info('Polling disabled');
  }

  POLL_FLAG = false;
};

const startPolling = () => {
  if (isPolling()) {
    stopPolling();
  }

  logger.info('Polling enabled');
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  pollSlaves();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ID = setInterval(pollSlaves, POLL_INTERVAL * 1000);
};

const isPolling = () => {
  return !(ID === undefined || ID === null);
};

const setPollingInterval = (minutes: number) => {
  const wasPolling = isPolling();
  if (wasPolling) {
    stopPolling();
  }

  POLL_INTERVAL = minutes;
  if (wasPolling) {
    startPolling();
  }
};

const getPollingInterval = () => {
  return POLL_INTERVAL;
};

export default {
  startPolling,
  stopPolling,
  isPolling,
  setPollingInterval,
  getPollingInterval
};