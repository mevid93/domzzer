import axios from 'axios'
const baseUrl = 'http://localhost:3001/info'

const getInfo = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const service = { getInfo }
export default service