const os = require('os')

const getSystemInformation = () => {
  let time = new Date()
  time = time.toTimeString()

  let uptime = process.uptime()
  uptime = (uptime + '').toHHMMSS()

  const hostname = os.hostname()
  const serverType = os.type()
  const serverVersion = os.version()
  const serverMemoryMb = Math.floor(os.totalmem() / 1000000)

  return { time, uptime, hostname, serverType, serverMemoryMb, serverVersion }
}

String.prototype.toHHMMSS = function () {
  let sec_num = parseInt(this, 10)
  let hours = Math.floor(sec_num / 3600)
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  let seconds = sec_num - (hours * 3600) - (minutes * 60)

  if (hours < 10) { hours = '0' + hours }
  if (minutes < 10) { minutes = '0' + minutes }
  if (seconds < 10) { seconds = '0' + seconds }
  let time = hours + ':' + minutes + ':' + seconds
  return time
}

module.exports = { getSystemInformation }