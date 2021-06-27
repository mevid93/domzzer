import axios from 'axios'

const baseUrl = '/api/settings'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const get = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const update = (updatedSettings) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.put(baseUrl, updatedSettings, config)
  return request.then(response => response.data)
}


const sendStartCommand = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(`${baseUrl}/start`, {}, config)
  return request.then(response => response.data)
}

const sendStopCommand = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(`${baseUrl}/stop`, {}, config)
  return request.then(response => response.data)
}

const service = { get, update, sendStartCommand, sendStopCommand, setToken }
export default service