import axios from 'axios'

const baseUrl = '/api/slaves'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const service = { getAll }
export default service