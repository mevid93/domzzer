import axios from 'axios'

const baseUrl = '/api/slaves'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = (newSlave) => {
  const request = axios.post(baseUrl, newSlave)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const service = { getAll, getById, create, remove, }
export default service