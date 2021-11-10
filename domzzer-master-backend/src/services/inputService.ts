import { Credentials } from "../types/types";
import { NewSlave, UpdateSlave } from "../types/types";
import { NewUser, UpdateUser } from '../types/types';
import { NewVulnerability, UpdateVulnerability } from "../types/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toCredentials = (object: any): Credentials => {
  const newCredentials: Credentials = {
    username: parseUsername(object.username),
    password: parsePassword(object.password)
  };

  return newCredentials;
};

const parseUsername = (username: unknown): string | undefined => {
  if (!username || !(typeof username === 'string' || username instanceof String)) {
    return undefined;
  }

  return username.toString();
};

const parsePassword = (password: unknown): string | undefined => {
  if (!password || !(typeof password === 'string' || password instanceof String)) {
    return undefined;
  }

  return password.toString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPollInverval = (object: any): number | undefined => {
  const newPollInterval = parsePollInterval(object.pollInterval);
  return newPollInterval;
};

const parsePollInterval = (interval: unknown): number | undefined => {
  if (!interval || !(typeof interval === 'number' || interval instanceof Number)) {
    return undefined;
  }

  return interval.valueOf();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewSlave = (object: any): NewSlave => {
  const newSlave: NewSlave = {
    name: parseName(object.name),
    address: parseAddress(object.address),
    username: parseUsername(object.username),
    password: parsePassword(object.password)
  };

  return newSlave;
};

const parseName = (name: unknown): string | undefined => {
  if (!name || !(typeof name === 'string' || name instanceof String)) {
    return undefined;
  }

  return name.toString();
};

const parseAddress = (address: unknown): string | undefined => {
  if (!address || !(typeof address === 'string' || address instanceof String)) {
    return undefined;
  }

  return address.toString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUpdateSlave = (object: any): UpdateSlave => {
  const updateSlave: UpdateSlave = {
    name: parseName(object.name),
    address: parseAddress(object.address),
    username: parseUsername(object.username),
    password: parsePassword(object.password)
  };

  return updateSlave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewUser = (object: any): NewUser => {
  const newUser: NewUser = {
    username: parseUsername(object.username),
    userRole: parseUserRole(object.userRole),
    password: parsePassword(object.password)
  };

  return newUser;
};

const parseUserRole = (role: unknown): 'LITE' | 'PRO' | 'ADMIN' | undefined => {
  if (!role || !(role === 'LITE' || role === 'PRO' || role === 'ADMIN')) {
    return undefined;
  }

  return role;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUpdateUser = (object: any): UpdateUser => {
  const updateUser: UpdateUser = {
    username: parseUsername(object.username),
    userRole: parseUserRole(object.userRole),
    password: parsePassword(object.password)
  };

  return updateUser;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toUpdateVulnerability = (object: any): UpdateVulnerability => {
  const updateVulnerability: UpdateVulnerability = {
    status: parseStatus(object.status),
  };

  return updateVulnerability;
};

const parseStatus = (status: unknown): 'OPEN' | 'ZERODAY' | 'CLOSED' | undefined => {
  if (!status) {
    return undefined;
  }

  if (typeof status !== 'string' && !(status instanceof String)) {
    throw new Error('Validation failed: status must be of type string');
  }

  status = status.toString();

  if (status !== 'OPEN' && status !== 'ZERODAY' && status !== 'CLOSED') {
    const error = new Error('Validation failed: status: `' + status + '` is not a valid enum value for path `status`.');
    error.name = 'ValidationError';
    throw error;
  }

  return status;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewVulnerability = (object: any): NewVulnerability => {
  const newVulnerability: NewVulnerability = {
    serverAddress: parseAddress(object.serverAddress),
    targetBrowser: parseTargetBrowser(object.targetBrowser),
    timestamp: parseTimestamp(object.timestamp),
    status: 'OPEN',
    payload: parsePayload(object.payload)
  };

  return newVulnerability;
};

const parseTargetBrowser = (browser: unknown): string | undefined => {
  if (!browser || !(typeof browser === 'string' || browser instanceof String)) {
    return undefined;
  }

  return browser.toString();
};

const parseTimestamp = (timestamp: unknown): Date | undefined => {
  if (!timestamp || !(typeof timestamp === 'string' || timestamp instanceof String)) {
    return undefined;
  }

  const milliseconds = Date.parse(timestamp.toString());

  if (isNaN(milliseconds)) {
    return undefined;
  }

  return new Date(milliseconds);
};

const parsePayload = (payload: unknown): string | undefined => {
  if (!payload || !(typeof payload === 'string' || payload instanceof String)) {
    return undefined;
  }

  return payload.toString();
};

export default {
  toCredentials,
  toPollInverval,
  toNewSlave,
  toUpdateSlave,
  toNewUser,
  toUpdateUser,
  toNewVulnerability,
  toUpdateVulnerability
};