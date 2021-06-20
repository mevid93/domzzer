const Slave = require('../models/slave')

const initialSlaves = [
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

const nonExistingId = async () => {
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

module.exports = {
  initialSlaves, nonExistingId, slavesInDb
}