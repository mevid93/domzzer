import Slave from '../src/models/slave';
import User from '../src/models/user';
import Vulnerability from '../src/models/vulnerability';
import aes256 from '../src/services/aesCryptoService';


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
];

const nonExistingSlaveId = async (): Promise<string> => {
  const slave = new Slave({
    name: 'NonExistingSlave',
    address: 'http://127.0.0.1:1003',
    status: 'OFFLINE',
    testsDone: 100,
    vulnerabilitiesFound: 0,
  });
  const savedSlave = await slave.save();
  await savedSlave.remove();
  const id = savedSlave._id;
  return id.toString();
};

const slavesInDb = async () => {
  const slaves = await Slave.find({});
  return slaves;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

const nonExistingUserId = async (): Promise<string> => {
  const user = new User({
    username: 'unknown',
    passwordHash: 'idafdafdafdafadas',
    userRole: 'LITE',
  });
  const savedUser = await user.save();
  await savedUser.remove();
  const id = savedUser._id;
  return id.toString();
};

const initialVulnerabilities = [
  {
    serverAddress: 'http://192.168.1.1',
    targetBrowser: 'chrome',
    timestamp: new Date(2021, 6, 25, 10, 51, 0, 0),
    status: 'OPEN',
    payload: "<html>hacked</html>"
  },
];

const nonExistingVulnerabilityId = async (): Promise<string> => {
  const vulnerability = new Vulnerability(initialVulnerabilities[0]);
  const savedVulnerability = await vulnerability.save();
  await savedVulnerability.remove();
  const id = savedVulnerability._id;
  return id.toString();
};

const vulnerabilitiesInDb = async () => {
  const vulnerabilities = await Vulnerability.find({});
  return vulnerabilities;
};

export default {
  initialSlaves,
  nonExistingSlaveId,
  slavesInDb,
  nonExistingUserId,
  usersInDb,
  initialVulnerabilities,
  nonExistingVulnerabilityId,
  vulnerabilitiesInDb
};