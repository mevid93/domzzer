// import Slave from '../models/slave';

let ID: NodeJS.Timeout | undefined;
let POLL_INTERVAL = 10;

// const pollSlaves = async () => {
  // const slaves = await Slave.find({}).lean();
  // slaves.forEach(s => {
  //   console.log('polling slave ', s.name);
  // });
// };

const stopPolling = () => {
  if (ID !== undefined) {
    clearInterval(ID);
    ID = undefined;
  }
};

const startPolling = () => {
  if (isPolling()) {
    stopPolling();
  }
  // ID = setInterval(pollSlaves, POLL_INTERVAL * 1000 * 60);
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