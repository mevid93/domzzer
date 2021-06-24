import axios from 'axios'

const baseUrl = '/api/info'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getInfo = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const service = { getInfo, setToken }
export default service