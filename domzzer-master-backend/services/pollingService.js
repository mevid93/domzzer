const Slave = require('../models/slave')

let ID
let POLL_INTERVAL = 10

const pollSlaves = async () => {
  const slaves = await Slave.find({}).lean()
  slaves.forEach(s => {
    console.log('polling slave ', s.name)
  })
}

const stopPolling = () => {
  clearInterval(ID)
  ID = undefined
}

const startPolling = () => {
  if (isPolling()) {
    stopPolling()
  }
  ID = setInterval(pollSlaves, POLL_INTERVAL * 1000 * 60)
  pollSlaves()
}

const isPolling = () => {
  return !(ID === undefined || ID === null)
}

const setPollingInterval = (minutes) => {
  const wasPolling = isPolling()
  if (wasPolling) {
    stopPolling()
  }
  POLL_INTERVAL = minutes
  if (wasPolling) {
    startPolling()
  }
}

const getPollingInterval = () => {
  return POLL_INTERVAL
}

module.exports = {
  startPolling,
  stopPolling,
  isPolling,
  setPollingInterval,
  getPollingInterval,
}