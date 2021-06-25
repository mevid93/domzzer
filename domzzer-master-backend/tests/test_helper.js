const Slave = require('../models/slave')
const User = require('../models/user')
const Vulnerability = require('../models/vulnerability')
const aes256 = require('../services/aesCryptoService')

const initialSlaves = [
  {
    name: 'SlaveMachine0',
    address: 'http://127.0.0.1:1000',
    status: 'OFFLINE',
    testsDone: 50,
    vulnerabilitiesFound: 0,
    username: 'admin123',
    password: aes256.encrypt('DontTellAnyone')
  },
  {
    name: 'SlaveMachine1',
    address: 'http://127.0.0.1:1001',
    status: 'OFFLINE',
    testsDone: 100,
    vulnerabilitiesFound: 0,
  },
  {
    name: 'SlaveMachine2',
    address: 'http://127.0.0.1:1002',
    status: 'OFFLINE',
    testsDone: 50,
    vulnerabilitiesFound: 1,
  }
]

const nonExistingSlaveId = async () => {
  const slave = new Slave({
    name: 'NonExistingSlave',
    address: 'http://127.0.0.1:1003',
    status: 'OFFLINE',
    testsDone: 100,
    vulnerabilitiesFound: 0,
  })
  await slave.save()
  await slave.remove()
  return slave._id.toString()
}

const slavesInDb = async () => {
  const slaves = await Slave.find({})
  return slaves.map(slave => slave.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialVulnerabilities = [
  {
    serverAddress: 'http://192.168.1.1',
    targetBrowser: 'chrome',
    timestamp: new Date(2021, 6, 25, 10, 51, 0, 0),
    status: 'OPEN'
  },
]

const nonExistingVulnerabilityId = async () => {
  const vulnerability = new Vulnerability(initialVulnerabilities[0])
  await vulnerability.save()
  await vulnerability.remove()
  return vulnerability._id.toString()
}

const vulnerabilitiesInDb = async () => {
  const vulnerabilities = await Vulnerability.find({})
  return vulnerabilities.map(vulnerability => vulnerability.toJSON())
}

module.exports = {
  initialSlaves,
  nonExistingSlaveId,
  slavesInDb,
  usersInDb,
  initialVulnerabilities,
  nonExistingVulnerabilityId,
  vulnerabilitiesInDb,
}