import axios, { AxiosResponse } from 'axios';
import Slave from '../models/slave';
import Vulnerability from '../models/vulnerability';
import aes256 from '../services/aesCryptoService';
import inputService from '../services/inputService';
import { NewVulnerability } from '../types/types';


let ID: NodeJS.Timeout | undefined;
let POLL_INTERVAL = 10;
let pollFlag = false;

const pollSlaves = async () => {
  if (pollFlag) {
    return;
  }

  pollFlag = true;

  const slaves = await Slave.find({}).lean();
  const loginPromises: Promise<AxiosResponse>[] = [];
  const vulnerabilityPromises: Promise<AxiosResponse>[] = [];
  const addressesOfServersOnline: string[] = [];
  const tokensForServersOnline: string[] = [];

  slaves.forEach(slave => {
    // create address where to poll
    const address = slave.address.slice(-1) == '/' ? slave.address : slave.address + '/';
    const username = slave.username;
    const password = slave.password !== undefined ? aes256.decrypt(slave.password) : '';

    // try login to slave
    const login = axios.post(`${address}api/login`, { username, password });
    loginPromises.push(login);
  });

  // once all requests are done, check the status of each request.
  // if response was rejected, then set status of the slave to be offline
  // if response was fulfilled, then set the status to be online and poll vulnerabilities
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
  }).catch((error) => console.log(error));

  // once all requests to retrieve vulnerabilities have been done, chec the status of each request
  // if response was rejected --> ignore it
  // if response was fullfilled, check if any vulnerabilities were returned
  // if no vulnerabilities were returned --> move to next response
  // if vulnerabilities were found --> then save them to the database, and remove them from the slave
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
          }).catch((error) => console.log(error));
        });
      }
      index += 1;
    });
  }).catch((error) => console.log(error));

  pollFlag = false;
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
  } catch (error){
    console.log(error);
    console.log("ERROR: SlaveAPI returned invalid data!");
    return false;
  }
};

const stopPolling = () => {
  if (ID !== undefined) {
    clearInterval(ID);
    ID = undefined;
  }

  pollFlag = false;
};

const startPolling = () => {
  if (isPolling()) {
    stopPolling();
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ID = setInterval(pollSlaves, POLL_INTERVAL * 1000 * 60);
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