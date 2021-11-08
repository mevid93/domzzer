import os from 'os';
import { SystemInformation } from '../types/types';

const getSystemInformation = (): SystemInformation => {
  const time = new Date().toTimeString();
  const uptime = process.uptime();
  const uptimeStr = uptimeToString(uptime);
  const hostname = os.hostname();
  const serverType = os.type();
  const serverVersion = os.version();
  const serverMemoryMb = Math.floor(os.totalmem() / 1000000);
  return { time, uptime: uptimeStr, hostname, serverType, serverVersion, serverMemoryMb };
};

const uptimeToString = function (uptime: number): string {
  uptime = Math.floor(uptime);
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime - (hours * 3600)) / 60);
  const seconds = uptime - (hours * 3600) - (minutes * 60);
  let hoursStr = '';
  let minutesStr = '';
  let secondsStr = '';
  if (hours < 10) { hoursStr = '0' + hours; }
  if (minutes < 10) { minutesStr = '0' + minutes; }
  if (seconds < 10) { secondsStr = '0' + seconds; }
  const time = hoursStr + ':' + minutesStr + ':' + secondsStr;
  return time;
};

export default { getSystemInformation };